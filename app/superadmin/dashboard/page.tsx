import { Card } from "@/components/ui/card";
import { Users, FileText, AlertCircle, CheckCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Users className="w-10 h-10 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Agents</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <AlertCircle className="w-10 h-10 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">En attente</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <FileText className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Publications</p>
              <p className="text-2xl font-bold">156</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <CheckCircle className="w-10 h-10 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Agents Premium</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 