import { NextResponse } from "next/server";

// Número de WhatsApp (seguro en el servidor, no accesible desde el cliente)
const WHATSAPP_NUMBER = "573104350594";

export async function POST(request) {
  try {

    // Obtener datos del request
    const body = await request.json();
    const { type, productName, variantName } = body;

    // Generar mensaje según el tipo
    let message = "";

    switch (type) {
      case "product":
        const variant = variantName ? ` (${variantName})` : "";
        message = `Hola, quiero información sobre el producto: ${productName}${variant}`;
        break;

      case "asesoria":
        message = "Hola, quiero información sobre las asesorías personalizadas";
        break;

      case "general":
        message = body.message || "Hola, quiero más información";
        break;

      default:
        return NextResponse.json(
          { error: "Tipo de solicitud no válido" },
          { status: 400 }
        );
    }

    // Generar link de WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    return NextResponse.json({ link: whatsappLink });

  } catch (error) {
    console.error("Error en API de WhatsApp:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
