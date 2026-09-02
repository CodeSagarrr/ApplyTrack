import { FileSearch } from "lucide-react";
import { EmptyState, PageHeader } from "../../../components/ui/PagePrimitives";

export default function PlaceholderPage({ title = "Workspace page" }: { title?: string }) {
  return (
    <div className="min-h-svh">
      <PageHeader title={title} description="This section is ready for a focused frontend UI when the workflow is defined." />
      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <EmptyState icon={FileSearch} title="No interface designed yet" description="The navigation route is connected and waiting for its production page." />
      </div>
    </div>
  );
}
