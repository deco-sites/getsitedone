import { useEffect } from "preact/hooks";

export interface Props {
    rootId: string;
    scroll?: "smooth" | "auto";
    interval?: number;
    infinite?: boolean;
    isPerItem?: boolean;
    gap: number;
}

const ATTRIBUTES = {
    "data-slider": "data-slider",
    "data-slider-item": "data-slider-item",
    'data-slide="prev"': 'data-slide="prev"',
    'data-slide="next"': 'data-slide="next"',
    "data-dot": "data-dot",
};

// Percentage of the item that has to be inside the container
// for it it be considered as inside the container
const THRESHOLD = 0.6;

const intersectionX = (element: DOMRect, container: DOMRect): number => {
    const delta = container.width / 1_000;

    if (element.right < container.left - delta) {
        return 0.0;
    }

    if (element.left > container.right + delta) {
        return 0.0;
    }

    if (element.left < container.left - delta) {
        return element.right - container.left + delta;
    }

    if (element.right > container.right + delta) {
        return container.right - element.left + delta;
    }

    return element.width;
};

// as any are ok in typeguard functions
const isHTMLElement = (x: Element): x is HTMLElement =>
    // deno-lint-ignore no-explicit-any
    typeof (x as any).offsetLeft === "number";

const setup = ({ rootId, scroll, interval, infinite, isPerItem, gap }: Props) => {
    const root = document.getElementById(rootId);
    const slider = root?.querySelector(`[${ATTRIBUTES["data-slider"]}]`);
    const items = root?.querySelectorAll(`[${ATTRIBUTES["data-slider-item"]}]`);
    const prev = root?.querySelector(`[${ATTRIBUTES['data-slide="prev"']}]`);
    const next = root?.querySelector(`[${ATTRIBUTES['data-slide="next"']}]`);
    const dots = root?.querySelectorAll(`[${ATTRIBUTES["data-dot"]}]`);

    if (!root || !slider || !items || items.length === 0) {
        console.warn(
            "Missing necessary slider attributes. It will not work as intended. Necessary elements:",
            { root, slider, items, rootId },
        );

        return;
    }

    const firstItem = items[0].cloneNode(true) as HTMLElement;
    firstItem.setAttribute("data-slider-item", items.length.toString());
    const secondItem = items[1].cloneNode(true) as HTMLElement;
    secondItem.setAttribute("data-slider-item", (items.length + 1).toString());
    slider.appendChild(firstItem)
    slider.appendChild(secondItem)

    const itemsWithClone = root?.querySelectorAll(`[${ATTRIBUTES["data-slider-item"]}]`)
    const sliderWithClone = root?.querySelector(`[${ATTRIBUTES["data-slider"]}]`);

    let itemIndex = 0;

    const getElementsInsideContainer = () => {
        const indices: number[] = [];
        const sliderRect = sliderWithClone!.getBoundingClientRect();

        for (let index = 0; index < itemsWithClone.length; index++) {
            const item = itemsWithClone.item(index);
            const rect = item.getBoundingClientRect();

            const ratio = intersectionX(
                rect,
                sliderRect,
            ) / rect.width;

            if (ratio > THRESHOLD) {
                indices.push(index);
            }
        }

        return indices;
    };

    const goToItem = (index: number, reset?: boolean) => {
        const item = itemsWithClone.item(index);

        if (!isHTMLElement(item)) {
            console.warn(
                `Element at index ${index} is not an html element. Skipping carousel`,
            );

            return;
        }

        const offSet = item.clientWidth * index + (index === 1 ? gap : gap * 2)

        sliderWithClone!.scrollTo({
            top: 0,
            behavior: reset ? "instant" : scroll,
            left: offSet,
        });
    };

    function verifyHover() {
        items?.forEach(() => {
            clearInterval(timeout);
        });
    }

    const onClickPrev = () => {
        const indices = getElementsInsideContainer();
        // Wow! items per page is how many elements are being displayed inside the container!!
        const itemsPerPage = indices.length;

        const isShowingFirst = indices[0] === 0;
        const pageIndex = Math.floor(indices[indices.length - 1] / itemsPerPage);

        goToItem(
            isShowingFirst ? items.length - 1 : (pageIndex - 1) * itemsPerPage,
        );
    };

    const onClickNext = () => {
        const indices = getElementsInsideContainer();
        const isShowingLast = indices[indices.length - 1] === itemsWithClone.length - 1;
        if (!isPerItem) {
            // Wow! items per page is how many elements are being displayed inside the container!!
            const itemsPerPage = indices.length;

            const pageIndex = Math.floor(indices[0] / itemsPerPage);

            goToItem(isShowingLast ? 0 : (pageIndex + 1) * itemsPerPage);
        } else {
            const nextIndex = itemIndex + 1;
            itemIndex = (items.length < nextIndex || isShowingLast) ? 0 : nextIndex;
            goToItem(itemIndex);
        }
    };

    const scrollEndHandler = () => {
        goToItem(0, true);
    };

    const observer = new IntersectionObserver(
        (elements) =>
            elements.forEach((item) => {
                const index = Number(item.target.getAttribute("data-slider-item")) || 0;
                const dot = dots?.item(index);

                if (index === items.length) {
                    sliderWithClone?.addEventListener("scrollend", scrollEndHandler)
                }
                else {
                    sliderWithClone?.removeEventListener("scrollend", scrollEndHandler)
                }

                if (item.isIntersecting) {
                    dot?.setAttribute("disabled", "");
                } else {
                    dot?.removeAttribute("disabled");
                }
                if (!infinite) {
                    if (index === 0) {
                        if (item.isIntersecting) {
                            prev?.setAttribute("disabled", "");
                        } else {
                            prev?.removeAttribute("disabled");
                        }
                    }
                    if (index === itemsWithClone.length - 1) {
                        if (item.isIntersecting) {
                            next?.setAttribute("disabled", "");
                        } else {
                            next?.removeAttribute("disabled");
                        }
                    }
                }
            }),
        { threshold: THRESHOLD, root: slider },
    );

    itemsWithClone.forEach((item) => observer.observe(item));

    for (let it = 0; it < (dots?.length ?? 0); it++) {
        dots?.item(it).addEventListener("click", () => goToItem(it));
    }

    prev?.addEventListener("click", onClickPrev);
    next?.addEventListener("click", onClickNext);

    let timeout = interval && setInterval(onClickNext, interval);

    items.forEach((item) => {
        item.addEventListener("mouseover", verifyHover);
    });

    items.forEach((item) => {
        item.addEventListener(
            "mouseout",
            () => timeout = interval && setInterval(onClickNext, interval),
        );
    });

    // Unregister callbacks
    return () => {
        for (let it = 0; it < (dots?.length ?? 0); it++) {
            dots?.item(it).removeEventListener("click", () => goToItem(it));
        }

        prev?.removeEventListener("click", onClickPrev);
        next?.removeEventListener("click", onClickNext);

        observer.disconnect();

        clearInterval(timeout);
    };
};

function Slider({
    rootId,
    scroll = "smooth",
    interval,
    infinite = false,
    gap = 0
}: Props) {
    useEffect(() => setup({ rootId, scroll, interval, infinite, gap }), [
        rootId,
        scroll,
        interval,
        infinite,
        gap
    ]);

    return <div data-slider-controller-js />;
}

export default Slider;
