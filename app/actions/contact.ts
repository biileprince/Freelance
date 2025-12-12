"use server";

import { contactFormSchema, type ContactFormData } from "@/lib/schemas";

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate the data
    const validatedData = contactFormSchema.parse(data);

    // TODO: Implement email sending logic here
    // For now, we'll just log the data and simulate success
    console.log("Contact form submission:", validatedData);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: Send email using Resend or another service
    // await resend.emails.send({
    //   from: 'WebAxiom <onboarding@webaxiom.com>',
    //   to: ['your-email@example.com'],
    //   subject: `New Project Inquiry from ${validatedData.name}`,
    //   html: `...`
    // });

    return {
      success: true,
      message:
        "Thank you for your inquiry! I'll get back to you within 24 hours.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again or email me directly.",
    };
  }
}
