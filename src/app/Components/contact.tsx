
export default function Contact() {

  return (
    <div className="flex justify-between max-lg:flex-col">

      <div className="max-h-full flex flex-col gap-8">
        <article>
          <h1>JOACHIM LUNDGREN</h1>
          <h3 className="mb-4">Photographer / DOP / Strategist</h3>
          <p className="mb-[0rem] md:text-[1.5rem]">Tel: +46—0705—14 32 97</p>
          <a className="underline decoration-dashed">jl@velocity.ai</a>
        </article>
        <article>
          <h1>BENJAMIN MANDRE</h1>
          <h3 className="mb-4">Promptographer / CD / Strategist</h3>
          <p className="mb-[0rem] md:text-[1.5rem]">Tel: +46—0708—77 08 47</p>
          <a className="underline decoration-dashed">bm@velocity.ai</a>
        </article>
        <article>
          <h1>SUMMER KEEM</h1>
          <h3 className="mb-4">AI Artist</h3>
        </article>
      </div>

      <div className="max-h-full flex flex-col gap-4 pr-[4rem] max-lg:pr-0">
        <article>
          <h1>Europe</h1>
          <p className="mb-[0rem] md:text-[1.5rem]">Stora Nygatan 5</p>
          <p className="mb-[0rem] md:text-[1.5rem]">111 27</p>
          <p className="mb-[0rem] md:text-[1.5rem]">Stockholm</p>
          <p className="mb-[0rem] md:text-[1.5rem]">Sweden</p>
        </article>

        <article>
          <h1>Asia</h1>
          <p className="mb-[0rem] md:text-[1.5rem]">3-19-10 Shirokane</p>
          <p className="mb-[0rem] md:text-[1.5rem]">Minato</p>
          <p className="mb-[0rem] md:text-[1.5rem]">Tokyo</p>
          <p className="mb-[0rem] md:text-[1.5rem]">Japan</p>
        </article>
      </div>

    </div>
  );
};
