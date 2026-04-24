const clientList = [
  'Afry',
  'American Express',
  'Atrium Ljungberg',
  'Brabo',
  'Brasseriegruppen',
  'Cabonline',
  'Carnegie',
  'Condé Nast Traveller',
  'Coop',
  'Danielsson Fastigheter',
  'Electrolux',
  'Erik Penser Bank',
  'Ernst & Young',
  'Fabege',
  'Familjebostäder',
  'Fastighets AB Johan Dahl',
  'Försvarsmakten',
  'Happy Forsman & Bodenfors',
  'Hornbach',
  'Hästens Beds',
  'IKEA',
  'JM Bostad',
  'Mannheimer Swartling',
  'Nordea',
  'Norwegian Airlines',
  'Nyköpings Kommun',
  'Riksbyggen',
  'SAS',
  'SEB',
  'Skanska',
  'Stadium',
  'Stockholmsmässan',
  'United Airlines',
  'Upplands Väsby Kommun',
  'Uppsala Konsert & Kongress',
  'Åkestam Holst',
];

export default function About() {
  return (
    <>
      <section>
        <h2 className="mb-[1rem] uppercase">REDEFINING</h2>
        <h2 className="mb-[1rem] uppercase">STRATEGIC</h2>
        <h2 className="mb-[1rem] uppercase">BRANDING</h2>
        <p>Velocity Creative is a global visual agency working at the intersection of photography, strategic design, video and generative AI. We are concept-driven storytellers, combining traditional craft with advanced AI tools to build imagery that earns its place. Backed by 25 years of experience with leading international brands, we work across industries to produce intelligent, high-quality visuals that resonate. We challenge conventions, expand creative possibilities, and shape a new visual culture. Our background includes work for brands such as IKEA, SEB, Electrolux, SAS, United Airlines, Skanska, The Economist, and the Financial Times.
        </p>
      </section>
      <section>
        <h2 className="mb-[1rem]">SHARP CONTENT</h2>
        <h2 className="mb-[1rem]">CLEAR VISUALS</h2>
        <h2 className="mb-[1rem]">BOLD AMBITION</h2>
          <p>Four capabilities. One creative partner.</p>
          <strong>Visual Strategy</strong><p className="mt-2">Concepts and guidelines that shape how your brand communicates visually, ensuring a coherent and impactful presence across all platforms.</p>
          <strong>Photography</strong><p className="mt-2">On-location and studio photography, delivering images that communicate with precision and presence. </p>
          <strong>AI-Powered Imagery</strong><p className="mt-2"> Bespoke visuals created through advanced generative technologies, pushing creative boundaries while maintaining brand coherence.</p>
          <strong>Curated Image Libraries </strong><p className="mt-2">We build and manage digital image banks tailored to your company’s needs, providing a cohesive resource for your visual strategy on all platforms — social media, campaigns, presentations, and long-term communication.</p>
      </section>
      <section>
        <h2 className="mb-[1rem]">WHY WE ARE DIFFERENT</h2>
        <p>AI is everywhere. But we combine it with something most don’t: a deep foundation in analogue image-making. We use AI to expand the language of photography—and to explore what images can become. We also offer custom-trained models based on original material.</p>
      </section>
      <section>
        <h3>FAQ</h3>
        <strong>Who owns the rights to AI-generated images?</strong>
        <p>Under EU law, AI-generated content is not automatically protected by copyright. Protection may arise where there is sufficient human creative input. We structure our process to include clear authorship and, where relevant, integrate original photographic material. This allows the work to be used exclusively for your brand within current EU legal frameworks.</p>
        
        <strong>Is it safe to use AI-generated content in branding?</strong>
        <p>We work with a combination of proprietary material and selected third-party tools, including Midjourney, Higgsfield, Luma Labs and Runway. These systems are trained on large datasets that may include copyrighted material. We evaluate each project individually to manage legal risk and ensure suitability for commercial use.</p>

        <strong>Do you train your own models?</strong>
        <p>In some cases, yes. We train custom models on brand-specific material to produce imagery with a high level of control and consistency.</p>

        <strong>How is AI-imagery created?</strong>
        <p>We generate imagery from text, image or video inputs processed through advanced generative models. The outcome is shaped through iterative direction, selection and refinement.</p>

        <strong>Do you also work with conventional photography and video?</strong>
        <p>Yes. We have over 30 years of experience working with photography across advertising, corporate and editorial contexts. We combine commissioned photography with generative methods where relevant, depending on the needs of each project.</p>

        <h3>PAST CLIENTS</h3>

        <p>Our clients have included brands such as:</p>
        <ul>
          {clientList.map((client, index) => (
            <li key={index}><h3>{client}</h3></li>
          ))}
        </ul>
      </section>
    </>
  );
};
