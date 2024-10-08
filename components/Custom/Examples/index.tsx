import ExampleCard from "./ExampleCard";

const ExamplesSection = () => {
  return (
    <section id="examples" className="w-full py-12 md:py-24 lg:py-32 flex justify-center items-center">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Before and After</h2>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <ExampleCard
            title="Suburban Backyard Makeover"
            beforeImage="/placeholder.svg"
            beforeAlt="Before: Plain suburban backyard"
            afterImage="/placeholder.svg"
            afterAlt="After: Lush garden with patio"
          />
          <ExampleCard
            title="Small Urban Oasis"
            beforeImage="/placeholder.svg"
            beforeAlt="Before: Concrete urban backyard"
            afterImage="/placeholder.svg"
            afterAlt="After: Cozy urban retreat with vertical garden"
          />
        </div>
      </div>
    </section>
  );
}

export default ExamplesSection;