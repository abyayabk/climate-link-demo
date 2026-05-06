export const roleGuidance = {
  community: {
    title: "Community Resilience",
    description: "Leading local adaptation and awareness initiatives at the grassroots level.",
    actions: [
      { label: "Community Literacy", link: "/home/faq", info: "Workshops on CDRFI benefits for residents to build local advocacy." },
      { label: "Early Warning Systems", info: "Coordinate the dissemination of local alerts to ensure preparedness." }
    ],
    risks: ["Displacement", "Water Scarcity", "Loss of Livelihood"],
    finance: "Community-based risk sharing and micro-grants."
  },
  government: {
    title: "Public Risk Management",
    description: "Manage regional fiscal risks and protect public budgets from climate shocks.",
    actions: [
      { label: "Sovereign Risk Pools", link: "/home/glossary", info: "Learn about ARC (Africa Risk Capacity) and regional risk pools." },
      { label: "Contingency Planning", link: "/home/faq", info: "Establish procedures for timely catastrophe response and payouts." }
    ],
    risks: ["Infrastructure Damage", "Budget Shocks", "Displacement"],
    finance: "Catastrophic Bonds (CAT Bonds) and Sovereign Insurance."
  },
  humanitarian: {
    title: "Emergency Preparedness",
    description: "Coordinate immediate disaster relief and early actions for vulnerable groups.",
    actions: [
      { label: "Parametric Triggers", link: "/home/glossary", info: "Understand automatic thresholds that release funding before a disaster." },
      { label: "Early Actions", link: "/home/faq", info: "Implement pre-defined protocols when alerts are triggered." }
    ],
    risks: ["Food Insecurity", "Waterborne Disease", "Flash Floods"],
    finance: "Forecast-based Financing (FbF) and DREF funds."
  },
  business: {
    title: "Commercial Protection",
    description: "Safeguard assets, logistics, and supply chains from extreme weather events.",
    actions: [
      { label: "Business Continuity", link: "/home/faq", info: "Utilize risk transfer tools to maintain operations during shocks." },
      { label: "Fiscal Risk Disclosure", link: "/home/glossary", info: "Identify and report climate-related financial vulnerabilities." }
    ],
    risks: ["Asset Damage", "Supply Chain Volatility", "Increased Premiums"],
    finance: "Commercial Parametric Insurance and Climate Credit Lines."
  },
  insurance: {
    title: "Risk Underwriting",
    description: "Developing and scaling innovative CDRFI products for the local market.",
    actions: [
      { label: "Index Design", link: "/home/glossary", info: "Refine weather and yield indices to reduce basis risk." },
      { label: "Claims Automation", info: "Leverage satellite data for faster, objective payout triggers." }
    ],
    risks: ["Model Uncertainty", "Basis Risk", "Capital Depletion"],
    finance: "Reinsurance and Alternative Risk Transfer (ART)."
  },
  farmer: {
    title: "Agricultural Resilience",
    description: "Protect your harvest and livelihood with subsidized crop insurance.",
    actions: [
      { label: "View Crop Insurance", link: "/home/glossary", info: "Protect against drought, pests, or flood damage via NAIC." },
      { label: "Planting Advice", link: "/home/faq", info: "Adapt irrigation and harvesting based on seasonal outlooks." }
    ],
    risks: ["Crop Loss", "Soil Erosion", "Heat Stress"],
    finance: "Agricultural microinsurance and NIRSAL credit guarantees."
  },
  general: {
    title: "Climate Literacy",
    description: "Explore how climate finance protects lives and builds a resilient future.",
    actions: [
      { label: "Glossary Access", link: "/home/glossary", info: "Learn the essential terminology of climate and disaster risk." },
      { label: "Policy FAQ", link: "/home/faq", info: "Understand the programs available in your region." }
    ],
    risks: ["General Uncertainty", "Rising Food Costs", "Health Risks"],
    finance: "Publicly funded disaster relief and literacy programs."
  }
};