import { SearchAutocompleteInput } from "@/components/search/search-autocomplete-input";

export default function CategoryLayout(props: LayoutProps<"/categories">) {
  return (
    <>
      <div className="px-6 py-8">
        <SearchAutocompleteInput />
      </div>
      {props.children}
    </>
  );
}
