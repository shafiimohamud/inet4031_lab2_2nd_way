import { site } from "./site";

/**
 * Frequently asked questions (blueprint section 3).
 *
 * `answer` is plain text because it is also sent to search engines as structured data.
 * `verify` is a note for the owner; it only shows in review mode.
 * A question with no answer yet is hidden from the public site until the owner writes one.
 */
export type Faq = { question: string; answer: string | null; verify?: string; top?: boolean };

const callUs = site.phone ? `call us at ${site.phone.display}` : "call us";

export const faqs: Faq[] = [
  {
    question: "How do I book a ride?",
    answer:
      `Send the ride request form on this website, or ${callUs}. We call you back to confirm the details. Your ride is not booked until we confirm it with you.`,
    top: true,
  },
  {
    question: "How far ahead should I book?",
    answer: `Please ask as early as you can. The more notice we have, the easier it is to fit your ride in. If your appointment is soon, ${callUs} instead of using the form.`,
    verify: "Add your real minimum notice (for example, 2 business days) if you have one.",
    top: true,
  },
  {
    question: "Do you help at the door?",
    answer:
      "Yes. Our rides are door-through-door. Your driver helps you from your door, into the vehicle, and through the door at the place you are going.",
    verify: "Confirm this matches the assistance level you are authorized and insured to provide.",
    top: true,
  },
  {
    question: "Can a caregiver or family member ride with me?",
    answer: "Yes. One companion or caregiver can ride with you. Tell us when you request the ride so we save a seat.",
    verify: "Confirm the companion policy and whether there is any charge.",
    top: true,
  },
  {
    question: "Do you take wheelchairs, walkers, or oxygen?",
    answer:
      "Our vehicles are wheelchair accessible. If you use a walker, cane, portable oxygen, or other equipment, tell us when you request your ride so we can plan for it.",
    verify: "Confirm exactly which equipment you can carry, and whether you can provide a wheelchair.",
  },
  {
    question: "Do you take Medicaid?",
    answer:
      "If Medical Assistance (Medicaid) or your health plan covers your ride, the ride is usually arranged through your plan. See our Medicaid and insurance page for the steps. Not sure what you have? Call us and we will help you work out the next step.",
    verify: "Minnesota booking rule for covered rides, and your MHCP enrollment status. State both plainly once confirmed.",
    top: true,
  },
  {
    question: "What areas do you serve?",
    answer: `We serve ${site.serviceArea}. If you are not sure whether we come to your address, ${callUs} and ask.`,
  },
  {
    question: "What if I am running late, or my appointment runs long?",
    answer: `Call us as soon as you know, so we can let your driver know and adjust your ride.`,
    verify: "Add your wait-time and late-pickup policy.",
  },
  {
    question: "What if I need to cancel?",
    answer: `Call us as soon as you know you need to cancel. Early notice lets us give that time to another rider.`,
    verify: "Add your written cancellation and no-show policy.",
  },
  {
    question: "What if my driver is late?",
    answer: `Call us and we will check on your ride and tell you what to expect.`,
    verify: "Confirm who answers and what you can promise.",
  },
  {
    question: "How do I give feedback or file a complaint?",
    answer: `Call or email us using the details on our Contact page. Tell us what happened and how to reach you. We want to know when something goes wrong.`,
    verify: "Add the named contact person and the response timeline for complaints.",
  },
  {
    question: "Is this an emergency service?",
    answer:
      "No. We provide non-emergency medical transportation, which means rides to and from medical appointments. We do not provide medical care. If you have a medical emergency, call 911.",
  },
];

export const answeredFaqs = faqs.filter((faq): faq is Faq & { answer: string } => faq.answer !== null);
