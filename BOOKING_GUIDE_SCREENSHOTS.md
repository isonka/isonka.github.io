# Booking Guide Screenshot Instructions

To make the booking guide even more helpful, add screenshots of the actual MindBody interface.

## Screenshots Needed:

### 1. `tabs-selection.jpg`
**What to capture:** The top of the MindBody widget showing "Group Classes" and "Private Classes" tabs
- Make sure both tabs are visible
- Show which tab is active (highlighted)
- Capture the area right above the calendar

### 2. `calendar-selection.jpg`
**What to capture:** The calendar with a date selected and available time slots below
- Show the calendar with some dates highlighted
- Show the list of available time slots below the calendar
- Include the green "Book" buttons
- Show instructor names and available spots

### 3. `signup-form.jpg`
**What to capture:** The account creation form
- Show all input fields: First Name, Last Name, Email, Phone, Password
- Include the "Create Account" button
- Show the "Already have an account? Sign In" link

### 4. `pricing-selection.jpg`
**What to capture:** The pricing options page
- Show different package options (Single Class, 5-pack, 10-pack, etc.)
- Include prices and descriptions
- Show the "Select" or "Purchase" buttons

### 5. `payment-form.jpg`
**What to capture:** The payment information form
- Show credit card input fields (blur out any real card details!)
- Include expiration date and CVV fields
- Show billing address section
- Include the "Complete Purchase" button

### 6. `confirmation.jpg`
**What to capture:** The booking confirmation screen
- Show the success message/checkmark
- Include booking details (date, time, class type)
- Show any confirmation number

## How to Add Screenshots:

### Option 1: Add images to the project
1. Save your screenshots in `/public/assets/images/booking-guide/`
2. Name them exactly as listed above
3. Update `BookingGuide.tsx` to display real images:

```typescript
{/* Replace screenshot placeholder with real image */}
<div className="screenshot-container">
  <img 
    src={`/assets/images/booking-guide/${steps[activeStep].screenshot}`}
    alt={steps[activeStep].title}
    className="booking-screenshot"
  />
</div>
```

### Option 2: Use image editing
- Take screenshots on your phone or computer
- Crop to show only relevant parts
- Add arrows or highlights to important buttons
- Resize to ~800px width for web
- Save as .jpg or .png

## Tips for Good Screenshots:

✅ **DO:**
- Use a real booking session
- Show the actual interface your customers see
- Capture in good quality (not blurry)
- Highlight important buttons with arrows
- Use your actual schedule/classes

❌ **DON'T:**
- Include personal customer information
- Show real credit card numbers
- Use low resolution images
- Capture with browser toolbars showing

## Quick Screenshot Tool:

**Mac:** Cmd + Shift + 4
**Windows:** Windows + Shift + S
**Phone:** Volume Down + Power button

## Need Help?

If you need help taking or editing screenshots, let me know and I can provide more detailed instructions!

