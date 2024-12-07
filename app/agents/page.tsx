import { AgentsList } from "@/components/agents/agents-list";

export default function AgentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nos Agents Immobiliers</h1>
      <AgentsList />
    </div>
  );
}