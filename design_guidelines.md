# Laundry Service Website - Design Guidelines

## Design Approach

**Selected Approach**: Hybrid - Material Design principles for dashboard/utility pages + Enhanced marketing approach for home page

**Justification**: This is a functional business application requiring clean data management (orders table, forms) combined with a marketing home page to attract customers. Material Design provides excellent patterns for forms and tables while allowing creative freedom for the landing experience.

---

## Design Strategy by Page Type

### Home Page (Marketing/Landing)
- **Hero Section**: Full-width hero (min-h-screen or 80vh) with professional laundry service imagery showing clean, folded clothes or modern laundry facility
- **Structure**: Hero → Pricing Table → Services/Features → Contact Section
- **Layout Approach**: Centered content with generous whitespace, symmetrical design

### Orders & Create Pages (Utility/Dashboard)
- **Approach**: Clean, functional interface prioritizing readability and efficiency
- **No hero sections**: Direct access to functionality

---

## Typography Hierarchy

**Font Stack**: 
- Primary: Inter or Poppins (Google Fonts)
- Fallback: system-ui, sans-serif

**Scale**:
- Hero Headline: 4xl-6xl, font-bold (56-72px desktop)
- Section Headers: 3xl-4xl, font-semibold (36-48px)
- Page Titles: 2xl-3xl, font-semibold (24-36px)
- Card/Component Headers: xl, font-medium (20px)
- Body Text: base (16px), font-normal
- Form Labels: sm, font-medium (14px)
- Table Headers: sm, font-semibold, uppercase, tracking-wide

---

## Layout System

**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Component padding: p-4 to p-8
- Section spacing: py-16 to py-24 (desktop), py-12 (mobile)
- Card gaps: gap-6 to gap-8
- Form field spacing: space-y-4

**Container Strategy**:
- Home page sections: max-w-7xl mx-auto px-4
- Dashboard/Forms: max-w-6xl mx-auto px-4
- Reading content: max-w-prose

**Grid Patterns**:
- Pricing cards: grid-cols-1 md:grid-cols-3
- Services/Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Orders table: Full-width responsive table

---

## Component Library

### Navigation
- Sticky header with logo left, nav links center/right
- Links: Home, Orders, Create Order, Contact
- CTA button in header: "New Order" or "Get Started"
- Mobile: Hamburger menu with slide-out drawer

### Hero Section (Home Page)
- Full-width background image with overlay treatment
- Centered content: Headline + Subheadline + Primary CTA
- Primary CTA: Large button with blurred background for contrast
- Badge element: "Fast • Reliable • Professional" above headline

### Pricing Table
- Three-column cards (Wash Only, Wash & Iron, Premium Care)
- Each card: Service name, price per kg, feature list, CTA button
- Elevated cards with subtle shadow
- Highlight "Popular" option with badge

### Services/Features Grid
- Icon + Title + Description cards
- Icons: Font Awesome or Heroicons (laundry-related)
- 3-column grid on desktop, stacked on mobile

### Contact Section
- Two-column layout: Contact form (left) + Info/Map placeholder (right)
- Form fields: Name, Email, Phone, Message
- Info block: Phone, Email, Address, Hours

### Orders Table
- Responsive table with sticky header
- Columns: Order ID, Customer, Phone, Type, Weight, Status, Actions
- Status badges: Pill-shaped with appropriate visual treatment
- Action buttons: Edit (primary), Delete (destructive)
- Empty state: Icon + message when no orders

### Order Form (Create/Edit)
- Single-column form layout, max-width container
- Field groups with clear labels above inputs
- Input types: text, tel, select (dropdown), number
- Required field indicators
- Dropdown for Laundry Type with 4 options
- Dropdown for Status with 3 options
- Submit button: Full-width on mobile, auto-width desktop

### Cards & Containers
- Rounded corners: rounded-lg (8px)
- Elevation: Subtle shadows for depth
- Padding: p-6 to p-8
- Borders: 1px solid with subtle divider treatment

### Buttons
- Primary: Solid fill, medium size, rounded-md
- Secondary: Outlined variant
- Destructive: Visual treatment for delete actions
- Sizes: py-2 px-4 (small), py-3 px-6 (medium), py-4 px-8 (large)
- States: Hover, active, disabled

### Form Elements
- Input fields: Full-width, rounded-md, border, py-2 px-3
- Labels: Above fields, font-medium
- Focus states: Ring treatment
- Error states: Red border + error message below
- Select dropdowns: Styled to match text inputs

### Status Badges
- Pending: Neutral treatment
- Processing: Active/in-progress treatment  
- Completed: Success treatment
- Rounded-full, px-3 py-1, text-xs font-medium

---

## Icons

**Library**: Heroicons (via CDN)
- Navigation: menu, x-mark, home, clipboard-list, plus
- Services: sparkles, clock, truck, shield-check
- Actions: pencil-square, trash, check, x-mark
- Form: user, phone, scale
- Status: clock, cog, check-circle

---

## Responsive Behavior

**Breakpoints**:
- Mobile: < 768px - Single column, stacked layout
- Tablet: 768px - 1024px - Two columns where appropriate
- Desktop: > 1024px - Full multi-column layouts

**Table Responsiveness**: 
- Desktop: Full table
- Mobile: Card-based layout or horizontal scroll

---

## Images

**Hero Image**: Professional laundry service photo - modern washing machines, neatly folded clothes, or clean commercial facility. Should convey trust, cleanliness, professionalism. Full-width, min-height 80vh.

**Placement**: Home page hero section only. All other pages focus on functionality without decorative imagery.

---

## Accessibility

- Semantic HTML: proper heading hierarchy, form labels, button text
- Focus indicators: visible keyboard navigation
- ARIA labels: for icon-only buttons, status badges
- Color contrast: ensure text meets WCAG AA standards
- Form validation: clear error messages, required field indicators

---

## Key Design Principles

1. **Clarity Over Complexity**: Clean, scannable interfaces prioritizing task completion
2. **Consistent Spacing**: Maintain rhythm with standardized spacing scale
3. **Data Visibility**: Orders and information clearly presented in organized tables
4. **Trust Signals**: Professional imagery and polished UI build credibility
5. **Mobile-First Forms**: Easy input on any device