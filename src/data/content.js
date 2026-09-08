/**
 * All marketing copy for the site, keyed by route slug.
 * Source: simpanacontent.md (scraped simpanatech.com) + build spec section 8.
 * Items flagged `sample: true` are placeholders called out in build spec section 9.
 */

/* ------------------------------------------------------------------ *
 * PRODUCTS - 7 systems, each with its own detail route
 * ------------------------------------------------------------------ */
export const PRODUCTS = [
  {
    slug: "warehouse-management",
    icon: "warehouse",
    code: "WMS",
    ref: "A-01",
    name: "Warehouse Management",
    abbr: "WMS",
    featured: true,
    status: "DEPLOYED / 3PL / DISTRIBUTION / MFG",
    card: "Goods receipt, quality inspection, put-away, cycle counts, labelling, and dispatch - one connected floor, with role-based screens that cut training time and keep physical and backend in sync.",
    short:
      "Turn-key WMS for 3PL, distribution, manufacturing, and fulfilment. Role-based screens simplify goods receipt, quality inspection, storage, and shipping.",
    summary:
      "The Warehouse Management System is a robust solution designed to enhance productivity, streamline workflows, and deliver real-time inventory updates for efficient decision-making. With role-based functionality it caters to specific organisational needs, ensuring user-friendly interfaces that simplify critical tasks such as goods receipt, quality inspection, storage, and shipping. By blending modern UX design with intuitive operations, WMS reduces training time, optimises resource management, and accelerates processes from unloading goods to final dispatch. It integrates physical and backend processes seamlessly, offering accurate inventory control, cycle counts, and streamlined labelling and transfer management.",
    intro: [
      "Optimises warehouse operations end to end",
      "Manages storage, movement, and tracking of goods",
      "Keeps the business competitive on fulfilment speed",
      "Enhances operational efficiency across every shift",
      "Boosts overall business success with accurate stock",
    ],
    features: [
      "Process all transactions carried in the warehouse, including goods receipts, issues, and stock transfers.",
      "Manages inventory at the storage bin level, making it less hectic and more manageable.",
      "Manage the structures of the warehouse no matter how complex they are.",
      "Make use of barcode scanners, making the entire inventory process much easier.",
      "Allows for easy management of potentially hazardous material.",
      "Monitor the movement of stock and process their differences.",
    ],
    chips: [
      "real-time",
      "role-based",
      "barcode",
      "cycle counts",
      "audit trail",
    ],
    brochure:
      "https://simpanatech.com/wp-content/uploads/2024/11/WMS_Internal_Final_V1.pdf",
    builtFor: [
      "Third-party logistics",
      "Distribution",
      "Manufacturing",
      "Fulfilment",
    ],
    image: "/images/products/warehouse-management.webp",
    ogImage: "/images/products/warehouse-management.jpg",
    imageAlt:
      "An autonomous mobile robot carrying a carton down a racked warehouse aisle.",
    keyPoints: [
      { title: "Bin-level control", body: "Stock is tracked to the storage bin, so a pick list names a location instead of an aisle." },
      { title: "Role-based screens", body: "Receiving, put-away, picking and dispatch each get their own screen - which is what cuts training time." },
      { title: "Barcode-driven moves", body: "Scanners drive receipts, transfers and cycle counts, so the physical move and the record happen together." },
      { title: "Complex layouts, modelled", body: "Multi-zone and mixed-storage warehouses are described as they actually are, hazardous goods included." },
    ],
  },
  {
    slug: "inventory-management",
    icon: "box",
    code: "IMS",
    ref: "A-02",
    name: "Inventory Management",
    abbr: "IMS",
    status: "DEPLOYED",
    card: "Catalogue, batch & serial tracking, orders, barcode, low-stock alerts.",
    short:
      "Track, store, and manage material across purchase and consumption - with a product catalogue, batch & serial tracking, barcode, and a live dashboard.",
    summary:
      "The Inventory Management System is a comprehensive material management application designed to streamline the purchase and consumption processes while maintaining accurate records of inventory. It serves as a vital tool for users - such as those in schools and universities - to track, store, and manage inventory efficiently. Advanced functionality such as barcode integration, low-stock alerts, and customisable notifications provide enhanced efficiency and accuracy. The system monitors inventory activity through a dynamic dashboard and notifies users about critical updates even without requiring them to log in.",
    intro: [
      "Tracks, stores, and manages inventory across sites",
      "Handles goods-in and goods-out operations",
      "Dashboard monitors operations without a login",
    ],
    features: [
      "Product catalogue: a database of products with SKU, description, and pricing.",
      "Batch and serial tracking: traceability through batch or serial numbers.",
      "Order tracking: monitor order status from placement to delivery.",
      "Barcode integration: efficient tracking with barcode scanning.",
      "Low-stock alerts: notifications for low inventory levels.",
      "Notification and email settings: customisable alerts per role.",
    ],
    chips: ["catalogue", "batch & serial", "barcode", "low-stock alerts"],
    brochure:
      "https://simpanatech.com/wp-content/uploads/2024/11/IMS-UNIVERSITY_Final_V1.pdf",
    builtFor: ["Distribution", "Education", "Manufacturing"],
    image: "/images/products/inventory-management.webp",
    ogImage: "/images/products/inventory-management.jpg",
    imageAlt:
      "A warehouse worker checking an inventory dashboard on a tablet in a racking aisle.",
    keyPoints: [
      { title: "One product catalogue", body: "A single database of SKUs, descriptions and pricing, shared across every site and every user." },
      { title: "Batch & serial traceability", body: "Follow a batch or serial number from receipt through consumption to the customer it shipped to." },
      { title: "Low-stock alerts", body: "Reorder thresholds per line, with notifications that reach people who never log in." },
      { title: "Order tracking", body: "Monitor each order from placement to delivery on a dashboard that works without a login." },
    ],
  },
  {
    slug: "point-of-sale",
    icon: "cart",
    code: "POS",
    ref: "A-04",
    name: "Point of Sale",
    abbr: "POS",
    status: "DEPLOYED",
    card: "Sales, payments, returns, invoicing, loyalty, inventory sync.",
    short:
      "Sales, payments (cash, card, mobile), returns, and invoicing in one place - with inventory sync, loyalty, purchase history, and sales analytics.",
    summary:
      "A Point of Sale application is a comprehensive solution designed to streamline sales transactions, inventory management, customer data handling, and business reporting. By integrating hardware and software it simplifies daily operations such as managing sales, processing payments, handling returns, and generating invoices. It tracks inventory levels, provides turnover insight, issues low-stock alerts, and assists with reordering. Reporting and analytics give visibility into sales, inventory, employee productivity, and financial performance.",
    intro: [
      "Streamlines sales transactions and daily activity",
      "Integrates hardware and software in one till",
      "Keeps customer records, invoices, and stock aligned",
    ],
    features: [
      "Sales processing: manages sales, returns, and payments (cash, cards, mobile).",
      "Inventory management: tracks stock levels, turnover, and low-stock alerts.",
      "Customer management: profiles, purchase history, loyalty programmes, and marketing.",
      "Reporting and analytics: sales, inventory, productivity, and finance reports.",
      "Employee management: schedules, hour tracking, permissions, and roles.",
    ],
    chips: ["multi-payment", "loyalty", "returns", "analytics"],
    brochure:
      "https://simpanatech.com/wp-content/uploads/2024/11/Point-of-Sale-POS_Final.pdf",
    builtFor: ["Retail", "Distribution", "Fulfilment"],
    image: "/images/products/point-of-sale.webp",
    ogImage: "/images/products/point-of-sale.jpg",
    imageAlt:
      "Two colleagues reviewing stock against warehouse racking, one holding a tablet.",
    keyPoints: [
      { title: "Every payment type", body: "Cash, card and mobile at one till, with returns and invoicing handled on the same screen." },
      { title: "Stock stays in sync", body: "Each sale moves inventory immediately, with turnover visibility and low-stock alerts for reordering." },
      { title: "Customers and loyalty", body: "Profiles, purchase history and loyalty programmes attached to the transaction, not to a separate system." },
      { title: "Reporting across the board", body: "Sales, inventory, employee productivity and financial performance in one reporting layer." },
    ],
  },
  {
    slug: "chemical-warehouse",
    icon: "flask",
    code: "CWMS",
    ref: "B-01",
    name: "Chemical Warehouse",
    abbr: "CWMS",
    status: "DEPLOYED",
    card: "Hazmat handling, compliance, auto-reorder, role-based approvals.",
    short:
      "Manage chemical inventory with safe handling of hazardous materials, regulatory compliance, automated reordering, and role-based access.",
    summary:
      "The Chemical Warehouse Management System is a comprehensive solution designed to streamline the management of chemical inventory, safety compliance, and operational efficiency. It centralises critical data, enabling accurate inventory tracking, safe handling of hazardous materials, and adherence to regulatory standards. With automated reordering, stock alerts, and role-based access control it ensures smooth order processing, optimised storage, and higher warehouse productivity - supporting staff and managers with role-specific tools for activity logging, reporting, and approval workflows.",
    intro: [
      "Manages chemical warehouse operations",
      "Centralises chemical inventory, safety, and compliance data",
      "Enhances order processing and reporting for chemical handling",
      "Role-specific design for warehouse staff and managers",
    ],
    features: [
      "Inventory management and tracking",
      "Safety compliance and hazardous material handling",
      "Order processing and fulfilment",
      "Storage optimisation and space utilisation",
      "Automated reordering and stock alerts",
      "Role-based access control",
      "Activity logging and reporting",
      "Approval workflows",
      "Data accuracy and periodical reporting",
    ],
    chips: ["hazmat", "compliance", "auto-reorder", "approvals"],
    brochure:
      "https://simpanatech.com/wp-content/uploads/2024/11/Inventory-CWH_Final_V1.pdf",
    builtFor: ["Manufacturing", "Distribution"],
    image: "/images/products/chemical-warehouse.webp",
    ogImage: "/images/products/chemical-warehouse.jpg",
    imageAlt:
      "Two workers in protective suits and respirators moving a container of hazardous material past storage tanks.",
    keyPoints: [
      { title: "Hazardous material handling", body: "Safe-handling rules live in the system rather than on a laminated sheet on the wall." },
      { title: "Built for the audit", body: "Activity logging, approval workflows and periodical reports - what an auditor reads first." },
      { title: "Automated reordering", body: "Stock alerts and reorder rules per chemical, so replenishment does not wait on someone noticing." },
      { title: "Role-based access", body: "Warehouse staff and managers get different tools for logging, reporting and approval." },
    ],
  },
  {
    slug: "tools-management",
    icon: "tool",
    code: "TMS",
    ref: "B-03",
    name: "Tools Management",
    abbr: "TMS",
    status: "DEPLOYED",
    card: "Catalogue, calibration, borrow & return, requisitions.",
    short:
      "Centralised tool catalogue, identification and classification, tracking and distribution, inspection and calibration, plus borrow-and-return for maintenance teams.",
    summary:
      "The Tool Management System is a comprehensive application designed to streamline tool room operations within the maintenance department. It organises and integrates information about tools, special equipment, portable devices, and consumables, ensuring effective support for departmental activity. With centralised catalogue management, item identification and classification, tool tracking and distribution, inspection and calibration management, and a borrowing and retrieval system, TMS optimises tool operations and improves data accuracy and visibility.",
    intro: [
      "Uniform information organisation: integrates plant tool information for streamlined operations.",
      "Tool catalogue management: stores the complete tool catalogue in one central database.",
      "Production-specific focus: tailored to production data, distinct from broader management systems.",
      "Spare parts management: handles spare parts used in production with proper tracking.",
    ],
    features: [
      "Item identification and classification",
      "Tool tracking, management, and distribution",
      "Management of inspection and calibration",
      "Borrowing and retrieving system",
      "New item requisition",
      "Audit trails for key transactions",
      "Superior approvals",
      "Periodical inventory report",
    ],
    chips: ["calibration", "borrow & return", "requisitions", "audit trail"],
    brochure:
      "https://simpanatech.com/wp-content/uploads/2024/11/TMS_Final.pdf",
    builtFor: ["Manufacturing", "Maintenance teams"],
    image: "/images/products/tools-management.webp",
    ogImage: "/images/products/tools-management.jpg",
    imageAlt:
      "A wooden toolbox filled with hand tools on a workbench.",
    keyPoints: [
      { title: "One tool catalogue", body: "Every tool, special-purpose device, portable instrument and consumable in a single plant-wide database." },
      { title: "Inspection & calibration", body: "Calibration schedules and inspection records sit on the tool record, so a due date is never a spreadsheet." },
      { title: "Borrow and return", body: "Issue and retrieval tracked per person, so an unreturned tool has a name against it." },
      { title: "Requisition & approval", body: "New-item requests route through superior approval, with an audit trail on key transactions." },
    ],
  },
  {
    slug: "school-management",
    icon: "school",
    code: "SMS",
    ref: "B-04",
    name: "School Management",
    abbr: "SMS",
    status: "DEPLOYED",
    card: "Students, staff, timetables, events, notifications, roles.",
    short:
      "Centralise students, teachers, timetables, and events - with enrollment, assignments, scheduling, notifications, and role-based access.",
    summary:
      "The School Management System is a comprehensive application designed to streamline and optimise school operations. It centralises data on students, teachers, timetables, and events, improving data accuracy and accessibility. The system supports student enrollment, teacher assignment, timetable management, and event planning alongside a notification system that keeps students and teachers informed. Role-based access control tailored for administrators, teachers, and students keeps resources secure and organised.",
    intro: [
      "Centralises data on students, teachers, timetables, and events",
      "Streamlines day-to-day school operations",
      "Supports notifications and reporting for smooth functioning",
      "Tailored roles for admin, teachers, and students",
    ],
    features: [
      "Student enrollment and management",
      "Teacher management and assignment",
      "Timetable and scheduling management",
      "Event planning and management",
      "Notification system",
      "Role-based access control",
      "Activity logging and reporting",
      "Approval workflows",
      "Data accuracy and periodical reporting",
    ],
    chips: ["enrollment", "timetables", "notifications", "role-based"],
    brochure:
      "https://simpanatech.com/wp-content/uploads/2024/11/School-Management-System-SMS_Final.pdf",
    builtFor: ["Education", "Training centres"],
    image: "/images/products/school-management.webp",
    ogImage: "/images/products/school-management.jpg",
    imageAlt:
      "A team gathered around a desk covered in plans and charts, working through a schedule together.",
    keyPoints: [
      { title: "One record per student", body: "Enrollment, teacher assignment and progress held together instead of split across offices." },
      { title: "Timetables & scheduling", body: "Timetable management and event planning in the same place as the people they affect." },
      { title: "Notifications that land", body: "Students and teachers hear about changes without having to go and check a portal." },
      { title: "Roles that fit a school", body: "Administrators, teachers and students each see what belongs to them, and nothing else." },
    ],
  },
  {
    slug: "event-management",
    icon: "calendar",
    code: "EMS",
    ref: "C-02",
    name: "Event Management",
    abbr: "EMS",
    status: "DEPLOYED",
    card: "Bookings calendar, expenses, invoicing, customer records.",
    short:
      "Bookings and a visual calendar, financial tracking and expense logging, employee and customer records, invoicing, and custom reports.",
    summary:
      "The Event Management System is a comprehensive application designed to streamline event planning and execution for business owners. It offers robust features for managing transactions, creating and overseeing event bookings, and accessing a visual booking calendar for efficient scheduling. The system allows seamless tracking of financial activity and detailed expense logging, categorised by customisable expense types, alongside employee management and customer records.",
    intro: [
      "Transactions: track financial activity",
      "Bookings: create and manage event bookings",
      "Invoices: generate detailed invoices",
      "Customer records: maintain customer information",
      "Daily activities: monitor day-to-day operations",
      "Reports: generate customised business reports",
    ],
    features: [
      "Employee management: store and manage employee details and roles.",
      "Event type details: customisable event types for better organisation.",
      "Expense tracking: detailed logging of expenses by category.",
      "Transaction management: comprehensive tracking of all financial transactions.",
      "Booking creation and management: an easy interface for event bookings.",
      "Booking calendar: a visual calendar for overview and scheduling.",
    ],
    chips: ["bookings", "calendar", "invoicing", "expenses"],
    brochure: "https://simpanatech.com/wp-content/uploads/2024/11/EMS_New.pdf",
    builtFor: ["Events", "Hospitality"],
    image: "/images/products/event-management.webp",
    ogImage: "/images/products/event-management.jpg",
    imageAlt:
      "A group of colleagues gathered around a laptop, planning together.",
    keyPoints: [
      { title: "Visual booking calendar", body: "Every booking on one calendar, so a clash surfaces before it is confirmed." },
      { title: "Expenses by category", body: "Detailed expense logging against customisable expense types, event by event." },
      { title: "Invoicing from the booking", body: "Invoices generate off the booking record, so the quote and the bill cannot drift apart." },
      { title: "Customer & employee records", body: "Customer history and staff details attached to the events they belong to." },
    ],
  },
];

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);

/* ------------------------------------------------------------------ *
 * SERVICES
 * ------------------------------------------------------------------ */
export const SERVICES = [
  {
    no: "S-01",
    icon: "warehouse",
    title: "Warehouse & inventory",
    short: "Turn-key WMS for 3PL, distribution, manufacturing, and fulfilment.",
    body: "As warehousing professionals with decades of supply-chain experience, our team is certain this turn-key system delivers mobility, accuracy, and efficiency. The Warehouse Management System is designed for 3PL, distribution, manufacturing, and fulfilment - our priority is making sure your warehouse business succeeds in the global supply chain.",
    points: [
      "3PL & distribution",
      "Manufacturing",
      "Fulfilment",
      "Bin-level control",
    ],
  },
  {
    no: "S-02",
    icon: "chain",
    title: "Supply-chain management",
    short:
      "Link production, shipment, and distribution to cut cost and speed delivery.",
    body: "Supply-chain management centrally controls and links the production, shipment, and distribution of a product. By managing the supply chain, companies cut excess cost and deliver to the consumer faster - through tighter control of internal inventories, production, distribution, sales, and vendor inventories.",
    points: [
      "Production linkage",
      "Shipment tracking",
      "Vendor inventory",
      "Cost control",
    ],
  },
  {
    no: "S-03",
    icon: "code",
    title: "Web development",
    short: "Custom sites, eCommerce, and web apps - integrated and supported.",
    body: "Our team combines innovative design, current technology, and industry best practice to create websites that captivate and perform seamlessly across platforms.",
    points: [
      "Custom website development",
      "E-commerce development",
      "Web application development",
      "Responsive and mobile-optimised design",
      "API and third-party integrations",
      "Maintenance and support",
    ],
  },
  {
    no: "S-04",
    icon: "sap",
    title: "SAP solutions",
    short:
      "Consulting, implementation, Fiori development, and managed support.",
    body: "We specialise in transforming businesses with SAP solutions that drive efficiency, agility, and growth - end-to-end consulting, implementation, and support tailored to each industry.",
    points: [
      "SAP consulting services",
      "SAP implementation & integration",
      "SAP Fiori development",
      "SAP managed services & support",
    ],
  },
  {
    no: "S-05",
    icon: "cloud",
    title: "Hosting & cloud",
    short: "Scalable infrastructure, migration, and 24/7 support.",
    body: "Your infrastructure needs to be agile, reliable, and ready to scale. Our hosting and cloud computing services let your organisation stay competitive on current cloud technology, backed by industry-leading security and round-the-clock support.",
    points: [
      "Scalable hosting",
      "Cloud migration",
      "Security hardening",
      "24/7 support",
    ],
  },
  {
    no: "S-06",
    icon: "shield",
    title: "Managed IT",
    short: "Monitoring, cybersecurity, and infrastructure, proactively run.",
    body: "With a client-centred approach we focus on proactive, customised support so you can concentrate on your core business. Our team monitors, manages, and optimises your technology environment with around-the-clock service and protection against downtime and security threats.",
    points: [
      "Network & infrastructure management",
      "Cybersecurity solutions",
      "Cloud services & migration",
    ],
  },
];

export const EDUCATION_BLOCKS = [
  {
    no: "E-01",
    icon: "school",
    title: "Institutes",
    body: "Schools, colleges, and universities - complete management systems for the people, timetables, and inventory behind them.",
  },
  {
    no: "E-02",
    icon: "users",
    title: "Training centres",
    body: "Online training portals plus the management layer that runs enrollment, scheduling, and reporting.",
  },
  {
    no: "E-03",
    icon: "code",
    title: "Websites",
    body: "Sites built for the education sector that turn enquiries into enrolments, and stay maintainable.",
  },
];

/* ------------------------------------------------------------------ *
 * CASE STUDIES
 * ------------------------------------------------------------------ */
export const CASES = [
  {
    slug: "asset-maintenance-management",
    tag: "ASSET MAINTENANCE",
    title: "Asset Maintenance Management",
    featured: true,
    card: "Cleared a key client's roadblocks in tracking assets across inventory, traceability, and delivery - in one system.",
    short:
      "Custom-developed for a key client to clear major roadblocks in managing assets across inventory, traceability, and delivery - in one system instead of scattered tracking.",
    body: [
      "The Asset Maintenance Management application was custom developed for one of our key clients. The client was managing assets across disconnected spreadsheets and departmental tools, which made traceability slow and delivery commitments hard to hold.",
      "The application consolidated inventory, traceability, and delivery into a single system with role-based access, so the same asset record follows the asset from intake through maintenance to delivery.",
    ],
    highlights: [
      "Single asset register across inventory, traceability, and delivery",
      "Role-based access for maintenance, stores, and management",
      "Audit trail on every asset movement",
    ],
    detailPending: true,
  },
  {
    slug: "furniture-retailer-ecommerce",
    tag: "RETAIL / ECOMMERCE",
    title: "Furniture retailer with eCommerce",
    card: "End-to-end platform tying inventory, purchasing, and sales to a storefront - returns handled from the site itself.",
    short:
      "End-to-end platform to manage inventory, purchasing, and sales alongside a storefront - with item returns handled from the website itself, and warehouse management underneath.",
    body: [
      "The furniture retailer wanted an end-to-end service platform where they could manage inventory, purchasing, and sales alongside eCommerce, with item returns initiated from the website itself.",
      "The warehouse management layer let the end user manage product location, shelves, and racks. Administrators managed products through approval workflows, and the storefront stayed in sync with real stock.",
    ],
    highlights: [
      "Sales, purchase, inventory, and warehouse management",
      "After-sales: returns and cancellation from the storefront",
      "Point of Sale with loyalty membership, on web and in store",
      "Payment gateway, SMS integration, and accounting with GST",
    ],
    features: [
      "Sales",
      "Purchase",
      "Inventory",
      "Warehouse Management",
      "After Sales: Return & Cancellation",
      "Ecommerce",
      "Mass Mailing",
      "Auto Notification Emails & SMS",
      "SMS Integration",
      "Payment Gateway Integration",
      "Accounting with GST",
      "Coupon & Discount Slabs",
      "Set & Collection Management",
      "Return Management",
      "Store Locator",
      "Zipcode Delivery Check",
      "Notify Customer on Product Stock Update",
      "Custom Login and Signup",
      "Point Of Sale",
      "Loyalty Membership POS along with Web",
      "Gift Cards Management",
      "Multi Barcode per Product",
      "Advance BOM Scenarios",
      "Swatch Management",
      "Safety Stock Management",
      "Max Date Delivery as per client Request",
      "Price Range Filters",
      "Advance Product Search",
      "Mega Menu",
      "Variant Wise Supplier Info",
      "Multi Product Image on Variant",
      "Custom Customer Account",
      "Landing Pages",
      "Wishlist Management",
      "Mobile Responsive",
    ],
  },
  {
    slug: "b2b-ecommerce-implementation",
    tag: "B2B / ECOMMERCE",
    title: "B2B eCommerce implementation",
    card: "Inventory and warehouse management with out-of-stock handling plus distributor & retailer management.",
    short:
      "Real-world B2B commerce with inventory and warehouse management, out-of-stock handling, and full distributor & retailer management.",
    body: [
      "This application was a classic example of implementing real-world B2B eCommerce with inventory and warehouse management underneath the storefront.",
      "It also implemented out-of-stock handling for stock lines, along with distributor and retailer management so each tier of the channel saw the right catalogue and the right pricing.",
    ],
    highlights: [
      "B2B ordering on top of live inventory",
      "Out-of-stock handling per stock line",
      "Distributor and retailer management",
    ],
    detailPending: true,
  },
];

export const getCase = (slug) => CASES.find((c) => c.slug === slug);

/* ------------------------------------------------------------------ *
 * BLOG - sample content, flagged in build spec section 9
 * ------------------------------------------------------------------ */
export const POSTS = [
  {
    slug: "wms-or-ims-which-does-your-operation-need",
    title: "WMS or IMS: which does your operation actually need?",
    date: "2026-08-18",
    readTime: "6 min",
    topic: "SYSTEMS",
    featured: true,
    excerpt:
      "They overlap on the org chart and almost nowhere else. A short test for working out which system your operation is actually missing.",
    body: [
      "Inventory management answers what you have and where it is booked. Warehouse management answers how it physically moves. Operations that buy the wrong one usually discover it about six weeks in, when the floor keeps working around the software.",
      "If your pain is counting - stock that disagrees with the ledger, batches you cannot trace, reorder points nobody trusts - you have an inventory problem. If your pain is movement - put-away decided by whoever is nearest, picks that walk the whole building, dispatch waiting on a printer - you have a warehouse problem.",
    ],
    sections: [
      {
        heading: "The counting test",
        paragraphs: [
          "Take one SKU with real turnover. Ask the system where it is, how much of it there is, and which batch shipped to which customer last month. If any of those answers requires a person rather than a screen, start with inventory management.",
        ],
      },
      {
        heading: "The movement test",
        paragraphs: [
          "Now walk a single order from receipt to dispatch and count the decisions a person makes from memory. Bin choice, pick sequence, packing bench, carrier. Each one is a place a warehouse system removes variance - and each one is where training time goes.",
        ],
      },
      {
        heading: "When you need both",
        paragraphs: [
          "Most growing 3PLs eventually do. The important part is sequencing: get the stock record trustworthy first, because a warehouse system built on numbers nobody believes just moves the argument closer to the dock door.",
        ],
      },
    ],
  },
  {
    slug: "cycle-counting-kills-warehouse-shrinkage",
    title: "How cycle counting kills warehouse shrinkage",
    date: "2026-08-04",
    readTime: "5 min",
    topic: "OPERATIONS",
    excerpt:
      "The annual stocktake tells you how wrong you were. Cycle counting tells you while you can still do something about it.",
    body: [
      "A once-a-year full count produces a number and a shrug. By the time the variance is known, the cause is months old and nobody can reconstruct it.",
      "Cycle counting inverts that: small, continuous counts of high-movement locations, scheduled so every zone gets checked several times a year without stopping the floor.",
    ],
    sections: [
      {
        heading: "Count what moves",
        paragraphs: [
          "Rank locations by throughput, not by value. The fast lines are where errors are created, and they are where a correction still means something.",
        ],
      },
      {
        heading: "Make variance a signal, not a verdict",
        paragraphs: [
          "Every count that disagrees with the system is information about a process - a mis-scan, a split pallet, a return that never got booked. Logging the cause alongside the correction is what turns counting into prevention.",
        ],
      },
    ],
  },
  {
    slug: "barcode-vs-rfid-for-mid-size-distributors",
    title: "Barcode vs RFID for mid-size distributors",
    date: "2026-07-21",
    readTime: "7 min",
    topic: "HARDWARE",
    excerpt:
      "RFID reads without line of sight, and that is genuinely useful. It is also rarely the constraint mid-size distributors are actually hitting.",
    body: [
      "The pitch for RFID is compelling: read a whole pallet at once, no aiming, no dwell. The question worth answering first is whether scanning speed is what is slowing your operation down.",
    ],
    sections: [
      {
        heading: "Where barcode still wins",
        paragraphs: [
          "Cost per label, tolerance for damage, and the fact that every phone in the building can read one. For most mid-size distributors, a disciplined barcode process closes more of the accuracy gap than a partial RFID rollout.",
        ],
      },
      {
        heading: "Where RFID earns its cost",
        paragraphs: [
          "High-mix pallets, returnable assets, and anywhere the physical act of presenting a label is the bottleneck. Those are real, and they are narrower than the marketing suggests.",
        ],
      },
    ],
  },
  {
    slug: "the-day-a-3pl-outgrows-spreadsheets",
    title: "The day a 3PL outgrows spreadsheets",
    date: "2026-07-07",
    readTime: "5 min",
    topic: "GROWTH",
    excerpt:
      "It is never one dramatic failure. It is the week you notice three people maintaining the same numbers in different files.",
    body: [
      "Spreadsheets scale further than people expect and then stop very suddenly. The warning signs are organisational before they are technical.",
    ],
    sections: [
      {
        heading: "The signs",
        paragraphs: [
          "Reconciliation becomes a job. A named person becomes the system of record. New clients need a new tab, and onboarding one takes a week of copy-paste.",
        ],
      },
      {
        heading: "What to move first",
        paragraphs: [
          "Stock and locations. Billing can stay in a spreadsheet for a surprisingly long time; the physical record cannot.",
        ],
      },
    ],
  },
  {
    slug: "storing-chemicals-without-failing-an-audit",
    title: "Storing chemicals without failing an audit",
    date: "2026-06-23",
    readTime: "6 min",
    topic: "COMPLIANCE",
    excerpt:
      "Segregation rules, expiry windows, and safety data - the parts of chemical storage that a general-purpose WMS quietly ignores.",
    body: [
      "A general warehouse system treats a drum like a box. Chemical storage does not work that way: what can sit next to what is a rule, not a preference.",
    ],
    sections: [
      {
        heading: "Segregation as a system rule",
        paragraphs: [
          "Incompatibility has to live in the put-away logic, not in a laminated sheet on the wall. If the system can suggest a bin that breaks a segregation rule, eventually it will.",
        ],
      },
      {
        heading: "The paperwork is the product",
        paragraphs: [
          "Approval workflows, activity logs, and periodical reports are what an auditor actually reads. Building them in from the start costs less than reconstructing them later.",
        ],
      },
    ],
  },
  {
    slug: "getting-your-pos-and-inventory-to-agree",
    title: "Getting your POS and inventory to agree",
    date: "2026-06-09",
    readTime: "5 min",
    topic: "INTEGRATION",
    excerpt:
      "Two systems, one stock figure, and a hundred small ways for them to drift apart by Friday.",
    body: [
      "The till and the stock ledger disagree for boring reasons: returns booked late, transfers recorded once, promotions that bundle SKUs the inventory system has never heard of.",
    ],
    sections: [
      {
        heading: "Pick one owner of truth",
        paragraphs: [
          "Not both. The inventory system should own quantity; the POS should own the transaction. Any design where both believe they own stock will drift.",
        ],
      },
      {
        heading: "Reconcile on a schedule you actually keep",
        paragraphs: [
          "A nightly job that runs is worth more than a real-time sync that fails silently at 4pm on the busiest day of the month.",
        ],
      },
    ],
  },
  {
    slug: "cutting-wms-training-time-in-half",
    title: "Cutting WMS training time in half",
    date: "2026-05-26",
    readTime: "4 min",
    topic: "ADOPTION",
    excerpt:
      "Role-based screens are not a UI preference. On a floor with turnover, they are the difference between a system used and a system worked around.",
    body: [
      "A picker does not need the receiving screen. Showing it to them costs training time twice: once to explain it, and once to explain why not to touch it.",
    ],
    sections: [
      {
        heading: "Design to the role, not the org chart",
        paragraphs: [
          "The useful unit is the task someone repeats forty times a shift. Build the screen around that, and most training becomes a ten-minute walkthrough.",
        ],
      },
      {
        heading: "Measure it",
        paragraphs: [
          "Time-to-first-correct-pick for a new starter is a better system metric than any satisfaction survey.",
        ],
      },
    ],
  },
];

export const getPost = (slug) => POSTS.find((p) => p.slug === slug);

/* ------------------------------------------------------------------ *
 * CAREERS - placeholder roles, flagged in build spec section 9
 * ------------------------------------------------------------------ */
export const ROLES = [
  {
    id: "full-stack-developer",
    title: "Full-stack developer",
    location: "Pune",
    type: "Full-time",
    team: "Product engineering",
    blurb:
      "Build and ship warehouse and inventory systems end to end - APIs, data model, and the screens the floor actually uses.",
  },
  {
    id: "qa-test-engineer",
    title: "QA / test engineer",
    location: "Pune",
    type: "Full-time",
    team: "Quality",
    blurb:
      "Own test strategy across our product line, from stock-movement edge cases to release regression on live deployments.",
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX designer",
    location: "Pune",
    type: "Full-time",
    team: "Design",
    blurb:
      "Design role-based operational screens that cut training time - work that gets used on a scanner in a cold aisle, not just in a portfolio.",
  },
  {
    id: "sap-consultant",
    title: "SAP consultant",
    location: "Pune",
    type: "Full-time",
    team: "SAP practice",
    blurb:
      "Consulting, implementation, and Fiori development for clients running SAP alongside our supply-chain products.",
  },
];

export const VALUES = [
  {
    no: "01",
    title: "Mission",
    body: "We chase extraordinary results by helping clients make distinctive improvements - the right technology, and good people to build it.",
  },
  {
    no: "02",
    title: "Vision",
    body: "Deliver among the best IT consulting and software development around, while taking care of our people and honouring our values.",
  },
  {
    no: "03",
    title: "Delivery",
    body: "Deep, thoughtful process - planned with precision, delivered with responsibility. No surprises at handover.",
  },
];

/** Options for the contact form's "what do you need" select. */
export const ENQUIRY_TOPICS = [
  "Warehouse management (WMS)",
  "Inventory management (IMS)",
  "Point of Sale (POS)",
  "Chemical warehouse (CWMS)",
  "Tools management (TMS)",
  "School management (SMS)",
  "Event management (EMS)",
  "Supply-chain consulting",
  "Web development",
  "SAP solutions",
  "Hosting, cloud & managed IT",
  "Something else",
];
