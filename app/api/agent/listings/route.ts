import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions as AuthOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/agent`, {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    });

    const listings = await response.json();
    return NextResponse.json(listings);

  } catch (error) {
    console.error('Erreur lors de la récupération des annonces:', error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
} 