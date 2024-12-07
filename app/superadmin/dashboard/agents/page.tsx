"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { Search, Filter } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "@/components/ui/empty-state";

interface Agent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  organization: string;
  agentStatus: string;
  isPremium: boolean;
  createdAt: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [premiumFilter, setPremiumFilter] = useState("all");

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    filterAgents();
  }, [agents, searchTerm, statusFilter, premiumFilter]);

  const fetchAgents = async () => {
    try {
      console.log("Fetching agents...");
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Debug

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agents/all`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status); // Debug

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Agents data:", data); // Debug

      setAgents(data);
      setFilteredAgents(data);
    } catch (error) {
      console.error("Error fetching agents:", error);
      toast.error("Erreur lors du chargement des agents");
    } finally {
      setIsLoading(false);
    }
  };

  const filterAgents = () => {
    let filtered = [...agents];

    // Filtre de recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (agent) =>
          agent.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.organization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter((agent) => agent.agentStatus === statusFilter);
    }

    // Filtre par premium
    if (premiumFilter !== "all") {
      filtered = filtered.filter(
        (agent) => agent.isPremium === (premiumFilter === "premium")
      );
    }

    setFilteredAgents(filtered);
  };

  const handleStatusChange = async (agentId: string, status: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/agents/${agentId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) throw new Error();

      toast.success("Statut mis à jour avec succès");
      fetchAgents();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };

  const handlePremiumToggle = async (agentId: string, isPremium: boolean) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/agents/${agentId}/premium`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ isPremium }),
        }
      );

      if (!response.ok) throw new Error();

      toast.success("Statut premium mis à jour avec succès");
      fetchAgents();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut premium");
    }
  };

  const handleDelete = async (agentId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet agent ?")) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/agents/${agentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error();

      toast.success("Agent supprimé avec succès");
      fetchAgents();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (filteredAgents.length === 0) {
    return (
      <EmptyState 
        title="Aucun agent trouvé"
        description="Il n'y a aucun agent correspondant à vos critères de recherche."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Agents</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Rechercher un agent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="PENDING">En attente</SelectItem>
                <SelectItem value="APPROVED">Approuvé</SelectItem>
                <SelectItem value="REJECTED">Rejeté</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={premiumFilter}
              onValueChange={setPremiumFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Organisation</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead>Date d'inscription</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{agent.firstName} {agent.lastName}</p>
                    <p className="text-sm text-gray-500">{agent.email}</p>
                  </div>
                </TableCell>
                <TableCell>{agent.phoneNumber}</TableCell>
                <TableCell>{agent.organization}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      agent.agentStatus === "APPROVED"
                        ? "success"
                        : agent.agentStatus === "PENDING"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {agent.agentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={agent.isPremium}
                    onCheckedChange={(checked) =>
                      handlePremiumToggle(agent.id, checked)
                    }
                  />
                </TableCell>
                <TableCell>
                  {new Date(agent.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {agent.agentStatus === "PENDING" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleStatusChange(agent.id, "APPROVED")
                          }
                        >
                          Approuver
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            handleStatusChange(agent.id, "REJECTED")
                          }
                        >
                          Rejeter
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(agent.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 