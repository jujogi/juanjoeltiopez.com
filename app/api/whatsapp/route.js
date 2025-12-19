import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Verificar que el número de WhatsApp esté configurado
    const whatsappNumber = process.env.WHATSAPP_NUMBER;
    if (!whatsappNumber) {
      console.error("WHATSAPP_NUMBER no está configurado en las variables de entorno");
      return NextResponse.json(
        { error: "Configuración del servidor incorrecta" },
        { status: 500 }
      );
    }

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
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    return NextResponse.json({ link: whatsappLink });

  } catch (error) {
    console.error("Error en API de WhatsApp:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
