import Icon from "../../components/ui/Icon.tsx";
import { dateDifference } from "../../sdk/date.ts"

export interface Card {
    price: string;
    title: string;
    name: string;
    level: string;
    /**
     * @format date
     */
    date: string;
    description: string;
    applications: number;
}

export interface Props {
    title: string;
    cards: Card[];
}

const Card = ({ title, name, level, date, description, price }: Card) => {
    const dateObject = new Date(date)
    const day = dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate();
    const mounth = (dateObject.getMonth() + 1) < 10 ? `0${dateObject.getMonth() + 1}` : (dateObject.getMonth() + 1);
    const year = dateObject.getFullYear().toString().slice(-2);
    return (
        <div class="flex flex-col gap-4 p-4 w-[360px] min-h-[205px] border border-[#C9CFCF] rounded-2xl">
            <p class="px-4 w-fit text-xl text-white bg-[#9900E5] rounded-full">{price}</p>
            <div class="flex flex-col">
                <p class="text-3xl font-semibold text-black">{title}</p>
                <div class="flex flex-col gap-2">
                    <p class="text-base font-normal text-[#949E9E]">{name}</p>
                    <div class="flex gap-4">
                        <div class="flex gap-1">
                            <Icon class="text-[#9900E5]" id="Diamond" width={16} height={17} />
                            <p class="text-sm text-[#9900E5]">{`Dificuldade ${level}`}</p>
                        </div>
                        <div class="flex gap-1">
                            <Icon class="text-[#9900E5]" id="Calendar" width={16} height={17} />
                            <p class="text-sm text-[#9900E5]">{`${day}/${mounth}/${year}`}</p>
                        </div>
                    </div>
                    <p class="text-sm text-[#5D5D5D] font-normal min-h-14">{description}</p>
                </div>
            </div>
            <p class="text-xs text-[#949E9E]">{`${dateDifference(date)} atrás • ${3} aplicações`}</p>
        </div>
    )
}

function BountiesCard({ title, cards }: Props) {

    return (
        <div class="container flex flex-col gap-20 py-16">
            <p class="text-center font-bold text-[48px]">{title}</p>
            <div class="flex gap-6 lg:justify-between justify-center">
                {cards.map((props) => <Card {...props} />)}
            </div>
        </div>
    );
}

export default BountiesCard;