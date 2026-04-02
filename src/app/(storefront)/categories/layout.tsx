import { SearchAutocompleteInput } from "@/components/search/search-autocomplete-input";

export default function CategoryLayout(props: LayoutProps<"/categories">) {
  return (
    <div className="bg-background">
      <section className="border-b bg-gradient-to-b from-muted/60 via-background to-background">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10">
          <div className="flex max-w-3xl flex-col gap-3">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Curated Categories
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Explore a refined catalog with cleaner filtering and faster browsing.
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Search instantly, narrow by essential attributes, and move through the collection with a calmer,
              more premium storefront flow.
            </p>
          </div>

          <div className="max-w-2xl">
            <SearchAutocompleteInput />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-6 py-8">
        {props.children}
      </div>
    </div>
  );
}
