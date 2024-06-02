export interface Props {
  title: string;
  buttonText: string;
  url: string;
}

function Cta({ title, buttonText, url }: Props) {
  return (
    <div class="container flex flex-col items-center justify-center gap-6">
      <p class="font-bold text-4xl text-black">{title}</p>
      <a
        href={url}
        class="btn rounded-full py-3 px-6 bg-transparent border border-black"
      >
        {buttonText}
      </a>
    </div>
  );
}

export default Cta;
