/**
 * Services (blueprint section 3). Only the three services named in the
 * blueprint are listed. VERIFY the service levels your Minnesota enrollment
 * permits before publishing; remove anything you are not authorized to provide.
 */
export const services = [
  {
    id: "ambulatory",
    icon: "walk",
    name: "Ambulatory rides",
    summary: "For riders who can walk on their own, or with a cane or walker.",
    forWho:
      "Riders who can walk on their own, or with a cane, crutches or a walker, and who would like a steady hand and a safe ride to their appointment.",
    included: [
      "Door-through-door help: from your door, into the vehicle, and through the door where you are going",
      "Help with your seat belt",
      "Room for one companion or caregiver",
    ],
  },
  {
    id: "wheelchair",
    icon: "wheelchair",
    name: "Wheelchair rides",
    summary: "Wheelchair accessible vehicles, with your chair secured for the whole ride.",
    forWho: "Riders who use a wheelchair and need a wheelchair accessible vehicle.",
    included: [
      "A wheelchair accessible vehicle",
      "Your wheelchair secured in place, and a seat belt for you, before the vehicle moves",
      "Door-through-door help at both ends of the ride",
      "Room for one companion or caregiver",
    ],
  },
  {
    id: "round-trip-and-recurring",
    icon: "repeat",
    name: "Round trips and regular rides",
    summary: "There and back, or the same ride every week: dialysis, therapy and other standing appointments.",
    forWho:
      "Riders with appointments that repeat, such as dialysis or therapy, and anyone who needs a ride home as well as a ride there.",
    included: [
      "A ride there and a ride home, arranged together",
      "The same schedule each week for standing appointments, so you do not have to ask every time",
      "Ambulatory or wheelchair accessible, whichever you need",
    ],
  },
] as const;
