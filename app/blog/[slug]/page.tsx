import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This would come from a CMS or markdown files in a real app
const articles: { [key: string]: any } = {
  "top-10-essential-car-parts-kenyan-drivers": {
    title: "Top 10 Essential Car Parts Every Kenyan Driver Should Know",
    category: "Maintenance",
    date: "October 20, 2025",
    readTime: "8 min read",
    content: `
# Top 10 Essential Car Parts Every Kenyan Driver Should Know

Whether you're navigating Nairobi's busy streets or driving upcountry, understanding your car's essential components can save you time, money, and stress. Here are the 10 critical car parts every Kenyan driver should be familiar with.

## 1. Brake Pads

Brake pads are crucial for your safety, especially in stop-and-go Nairobi traffic. These components create friction against the brake rotors to slow down your vehicle. Signs of worn brake pads include squealing noises and reduced braking performance.

**Replacement Timeline:** Every 30,000-50,000 km
**Cost Range:** KES 3,000 - 8,000 depending on your vehicle

## 2. Air Filter

Kenya's dusty roads can quickly clog your engine's air filter. A clean air filter ensures your engine breathes properly, improving fuel efficiency and performance. This is especially important if you frequently travel on murram roads.

**Replacement Timeline:** Every 15,000-20,000 km
**Cost Range:** KES 800 - 2,500

## 3. Timing Belt

The timing belt synchronizes your engine's camshaft and crankshaft rotation. If it breaks, it can cause severe engine damage. Japanese cars popular in Kenya (Toyota, Nissan, Subaru) typically have timing belt replacement intervals around 100,000 km.

**Replacement Timeline:** Every 80,000-100,000 km
**Cost Range:** KES 4,000 - 12,000

## 4. Battery

Kenya's hot climate can reduce battery life. A good car battery typically lasts 2-3 years in our conditions. Watch for slow cranking, dim lights, or electrical issues as signs your battery needs replacement.

**Replacement Timeline:** Every 2-3 years
**Cost Range:** KES 5,000 - 15,000

## 5. Shock Absorbers

With Nairobi's potholes and rough upcountry roads, shock absorbers take a beating. They're essential for ride comfort and vehicle stability. If your car bounces excessively or you notice uneven tire wear, check your shocks.

**Replacement Timeline:** Every 50,000-80,000 km
**Cost Range:** KES 8,000 - 25,000 for a set

## 6. Fuel Pump

The fuel pump delivers petrol or diesel from your tank to the engine. Symptoms of a failing fuel pump include difficulty starting, engine sputtering, or loss of power when accelerating. This is particularly important for older vehicles.

**Replacement Timeline:** Varies, typically 100,000+ km
**Cost Range:** KES 6,000 - 15,000

## 7. Alternator

Your alternator charges the battery while the engine runs. Without a functioning alternator, your battery will die, leaving you stranded. Warning signs include dim lights, warning lights on the dashboard, or dead battery after recent replacement.

**Replacement Timeline:** Varies, typically 100,000+ km
**Cost Range:** KES 8,000 - 20,000

## 8. Spark Plugs

Spark plugs ignite the fuel-air mixture in your engine. Worn spark plugs reduce fuel efficiency and engine performance. Most modern vehicles use long-life spark plugs that last 80,000-100,000 km.

**Replacement Timeline:** Every 40,000-100,000 km
**Cost Range:** KES 200 - 800 per plug

## 9. Radiator and Cooling System

Kenya's hot weather puts extra stress on your cooling system. The radiator helps prevent engine overheating. Regular maintenance includes checking coolant levels and flushing the system every 2 years.

**Replacement Timeline:** Radiator lasts 8-10 years; coolant every 2 years
**Cost Range:** Coolant KES 1,500 - 3,000; Radiator KES 10,000 - 30,000

## 10. Clutch Kit (Manual Transmission)

If you drive a manual car in Nairobi's traffic, your clutch works hard. Signs of clutch wear include slipping gears, difficulty shifting, or a burning smell. This is one of the most commonly replaced parts in Kenyan vehicles.

**Replacement Timeline:** Every 60,000-120,000 km
**Cost Range:** KES 15,000 - 40,000

## Conclusion

Knowing these essential parts helps you communicate better with mechanics, plan for maintenance costs, and spot problems early. Regular inspections and timely replacements keep your car reliable on Kenya's roads.

**Pro Tip:** Always buy genuine or high-quality OEM parts from reputable suppliers like PartsPOA to ensure longevity and reliability.
    `
  },
  "how-to-choose-quality-auto-parts-kenya": {
    title: "How to Choose Quality Auto Parts in Kenya: Complete Guide",
    category: "Buying Guide",
    date: "October 18, 2025",
    readTime: "10 min read",
    content: `
# How to Choose Quality Auto Parts in Kenya: Complete Guide

The Kenyan auto parts market offers everything from genuine OEM parts to counterfeit knock-offs. Making the right choice affects your car's performance, safety, and your wallet. Here's your complete guide to choosing quality auto parts in Kenya.

## Understanding the Market

Kenya's auto parts market has three main tiers:

### 1. Genuine OEM Parts
Original Equipment Manufacturer (OEM) parts are made by the same company that produced your car's original parts. These are the gold standard but come at a premium price.

**Pros:**
- Perfect fit guaranteed
- Highest quality and reliability
- Warranty coverage
- Consistent performance

**Cons:**
- Most expensive option
- May have longer waiting times for imports

**Best for:** New cars under warranty, critical safety components, luxury vehicles

### 2. Aftermarket OEM
These are parts made by reputable third-party manufacturers to OEM specifications. Brands like Bosch, Denso, and NGK fall into this category.

**Pros:**
- Good quality at reasonable prices
- Widely available
- Often come with warranties
- Trusted brand names

**Cons:**
- Quality varies by manufacturer
- Not all brands are reliable
- Some may not fit perfectly

**Best for:** Most repair and maintenance needs, cost-conscious buyers, older vehicles

### 3. Generic/Counterfeit Parts
Low-quality imitations that may look similar but use inferior materials and manufacturing processes.

**Pros:**
- Cheapest option initially

**Cons:**
- Poor quality and short lifespan
- May damage your vehicle
- No warranty
- Safety risks
- Higher long-term costs

**Best for:** Nothing - avoid these entirely

## How to Identify Quality Parts

### 1. Check the Packaging
Quality parts come in professional packaging with:
- Clear branding and logos
- Part numbers that match your vehicle
- Manufacturing date and batch numbers
- Barcode or QR code
- Installation instructions
- Warranty information

Counterfeit parts often have blurry printing, misspellings, or generic packaging.

### 2. Verify Part Numbers
Every genuine part has a unique part number. Before buying:
- Get the exact part number from your car's manual
- Cross-reference with the supplier
- Use online databases to verify compatibility
- Check that numbers match exactly

### 3. Examine Build Quality
Physically inspect the part:
- Weight (genuine parts use quality materials and are heavier)
- Finish quality (smooth, even coating without rough edges)
- Material quality (no cheap plastic on metal components)
- Precise machining (accurate dimensions and tolerances)

### 4. Brand Reputation
Stick to known brands:

**Trusted Brands in Kenya:**
- **Japanese:** Denso, NGK, Koyo, Aisin
- **European:** Bosch, Behr, Sachs, Mann
- **American:** AC Delco, Motorcraft, Delphi
- **Korean:** Mobis, Mando

Avoid brands you've never heard of, especially with suspiciously low prices.

## Where to Buy in Kenya

### 1. Authorized Dealers
Pros: Genuine parts, warranty, expert advice
Cons: Highest prices

Best for: New cars, warranty repairs, complex components

### 2. Reputable Online Stores (like PartsPOA)
Pros: Competitive prices, convenient, verified parts, easy comparison
Cons: Can't physically inspect before buying

Best for: Standard parts, busy people, price-conscious buyers

### 3. Physical Auto Parts Shops
Pros: Can inspect parts, immediate availability, negotiable prices
Cons: Quality varies, may stock counterfeits, time-consuming

Best for: Emergency repairs, local convenience

### 4. Junkyard/Used Parts
Pros: Very cheap, good for rare/discontinued parts
Cons: No warranty, unknown condition, shorter lifespan

Best for: Non-critical components, restoration projects, temporary fixes

## Red Flags to Avoid

🚩 **Price Too Good to Be True**
If a brake pad normally costs KES 5,000 and someone offers it for KES 1,500, it's likely counterfeit.

🚩 **No Return Policy**
Reputable sellers stand behind their products with clear return policies.

🚩 **Vague Product Information**
Quality sellers provide detailed specifications, part numbers, and compatibility info.

🚩 **No Physical Address**
Always buy from sellers with a verifiable physical location or established online presence.

🚩 **Pressure Tactics**
"Buy now or miss out" tactics often indicate questionable quality.

## Critical Parts - Never Compromise

For these safety-critical components, always buy the best quality available:

1. **Brake System:** Brake pads, rotors, brake fluid
2. **Suspension:** Shock absorbers, control arms, ball joints
3. **Steering:** Tie rods, steering rack, power steering pump
4. **Engine Timing:** Timing belt, tensioners, water pump
5. **Electrical:** Battery, alternator, ignition system

## Money-Saving Tips (Without Compromising Quality)

### 1. Compare Prices
Check multiple suppliers before buying. Online platforms make this easy.

### 2. Buy in Bulk
If replacing multiple parts (like all four brake pads), ask for bulk discounts.

### 3. Consider Aftermarket OEM
For non-critical parts, quality aftermarket brands offer 70-80% of OEM quality at 50-60% of the price.

### 4. Timing Matters
Shops may offer discounts during slow periods or end-of-month sales.

### 5. Join Loyalty Programs
Many suppliers offer points or discounts for repeat customers.

## Documentation is Key

Always keep:
- Receipts with detailed part information
- Warranty cards
- Installation records
- Supplier contact information

This helps with warranty claims and proves you used quality parts for resale value.

## Conclusion

Choosing quality auto parts in Kenya requires knowledge, patience, and working with reputable suppliers. While the initial cost may be higher, quality parts save money long-term through:
- Longer lifespan
- Better performance
- Fewer breakdowns
- Maintained vehicle value
- Safety assurance

**Remember:** Your car's reliability depends on the quality of parts you use. Choose wisely, buy smart, and keep your vehicle running smoothly on Kenya's roads.

**Shop with Confidence:** PartsPOA stocks verified, quality auto parts from trusted manufacturers with clear part numbers and warranties.
    `
  },
  "nairobi-traffic-car-maintenance-tips": {
    title: "Surviving Nairobi Traffic: Maintenance Tips for Your Car",
    category: "Maintenance",
    date: "October 15, 2025",
    readTime: "7 min read",
    content: `
# Surviving Nairobi Traffic: Maintenance Tips for Your Car

Nairobi's notorious traffic jams put unique stress on vehicles. Stop-and-go driving, long idle times, and frequent braking accelerate wear on critical components. Here's how to keep your car healthy despite the daily grind.

## The Traffic Challenge

The average Nairobi commuter spends 2-3 hours daily in traffic. This creates specific challenges:

- **Frequent gear changes** wear out clutches and transmissions
- **Constant braking** degrades brake systems faster
- **Extended idling** increases engine heat and oil degradation
- **Low-speed driving** prevents the engine from reaching optimal operating temperatures
- **AC usage** puts extra load on the engine and electrical system

## Essential Maintenance for Traffic Warriors

### 1. Clutch Care (Manual Transmission)

Nairobi traffic is particularly hard on clutches.

**Best Practices:**
- Use neutral and handbrake when stopped for more than 30 seconds
- Avoid riding the clutch while moving slowly
- Don't rest your foot on the clutch pedal
- Engage and disengage smoothly

**Warning Signs:**
- Slipping gears
- Difficulty shifting
- Burning smell
- Higher engagement point

**Maintenance:** Inspect every 50,000 km; typical replacement needed at 70,000-100,000 km in heavy traffic conditions.

### 2. Brake System Maintenance

You'll use your brakes 10-20 times more in traffic than on open roads.

**Daily Checks:**
- Listen for squealing or grinding
- Feel for vibration or pulling to one side
- Notice if the pedal feels soft or spongy
- Check brake fluid level monthly

**Maintenance Schedule:**
- Brake pads: Inspect every 10,000 km
- Brake fluid: Replace every 2 years
- Rotors: Resurface or replace with pads when needed

**Traffic Tip:** Anticipate stops early to reduce hard braking. This extends brake life significantly.

### 3. Engine Oil

Stop-and-go traffic is considered "severe driving conditions" by manufacturers.

**Traffic-Specific Guidelines:**
- Change oil every 5,000 km (instead of the usual 7,500-10,000 km)
- Use high-quality synthetic or semi-synthetic oil
- Check oil level every 2 weeks
- Watch for dark, gritty oil or burning smell

**Why:** Extended idling and frequent acceleration degrade oil faster than highway driving.

### 4. Cooling System

Traffic jams cause engines to run hotter than normal.

**Preventive Measures:**
- Check coolant level monthly
- Inspect hoses for cracks or bulges
- Clean radiator fins of debris
- Flush cooling system every 2 years
- Test radiator cap pressure

**Emergency Signs:**
- Temperature gauge in red zone
- Steam from hood
- Sweet smell (coolant leak)
- Overheating warning light

**Quick Fix:** If overheating in traffic, turn on heater full blast to draw heat from the engine.

### 5. Transmission Care

Automatic transmissions suffer in stop-and-go traffic.

**Automatic Transmission:**
- Change transmission fluid every 40,000 km
- Use parking brake on inclines
- Allow transmission to warm up before driving hard
- Service cooling system regularly

**Manual Transmission:**
- Inspect clutch fluid level
- Check for leaks around seals
- Listen for grinding when shifting

### 6. Fuel System

Poor fuel quality and traffic conditions affect fuel systems.

**Maintenance:**
- Use fuel system cleaner every 10,000 km
- Replace fuel filter every 40,000 km
- Keep tank at least 1/4 full (prevents debris circulation)
- Fill up at reputable stations

**Traffic Tip:** Plan fuel stops to avoid running low in traffic jams.

### 7. Battery and Electrical

Heavy electrical load from lights, AC, and accessories during idling stresses the battery.

**Care Tips:**
- Clean battery terminals monthly
- Check electrical connections
- Test battery annually
- Replace every 2-3 years in Kenya's climate
- Minimize electrical load when idling

### 8. Air Conditioning

AC works hardest in slow-moving traffic.

**Maintenance:**
- Service AC annually
- Check refrigerant levels
- Clean cabin air filter every 15,000 km
- Run AC for 10 minutes weekly (even in cool weather)

**Efficiency Tip:** Park in shade when possible; use recirculation mode in traffic.

## Traffic-Specific Driving Tips

### 1. The Two-Second Rule
Maintain at least 2 seconds following distance. This reduces constant braking and acceleration.

### 2. Smooth Acceleration
Gentle acceleration uses less fuel and reduces wear on drivetrain components.

### 3. Anticipate Traffic Flow
Watch several cars ahead, not just the one in front. This helps you maintain momentum.

### 4. Use Engine Braking
When safe, let the engine slow you down by downshifting instead of constant brake use.

### 5. Avoid Needless Lane Changes
Frequent lane changes increase clutch and brake wear with minimal time savings.

## Route Planning

Smart route choices reduce traffic exposure:

- Use Google Maps traffic feature
- Leave home 30 minutes earlier or later to avoid peak times
- Consider alternative routes, even if longer distance
- Plan errands to avoid rush hour

## Warning Signs Not to Ignore

Seek immediate attention if you notice:

🚨 **Brake Issues**
- Soft pedal
- Grinding noise
- Pulling to one side
- Vibration when braking

🚨 **Engine Problems**
- Overheating
- Check engine light
- Unusual noises
- Loss of power

🚨 **Transmission Issues**
- Slipping gears
- Delayed engagement
- Burning smell
- Fluid leaks

## Costs of Traffic-Driven Maintenance

Budget for these traffic-accelerated expenses:

- **Brake pads:** KES 4,000-8,000 every 30,000 km
- **Engine oil:** KES 3,000-6,000 every 5,000 km
- **Clutch replacement:** KES 15,000-40,000 every 70,000 km
- **Transmission service:** KES 8,000-15,000 every 40,000 km
- **Battery:** KES 7,000-15,000 every 2-3 years

## The Cost of Prevention vs. Breakdown

**Preventive maintenance:** KES 50,000-80,000 annually
**Major breakdown repairs:** KES 100,000-300,000 unexpectedly

Plus the hidden costs:
- Lost work time
- Towing fees
- Uber/taxi expenses
- Stress and inconvenience

## Conclusion

Nairobi's traffic is unavoidable, but its impact on your car doesn't have to be severe. Regular maintenance, smart driving habits, and attention to warning signs keep your vehicle reliable despite challenging conditions.

**Action Steps:**
1. Create a traffic-specific maintenance schedule
2. Find a trustworthy mechanic
3. Budget for accelerated wear items
4. Stock quality replacement parts before you need them
5. Keep emergency contacts saved in your phone

**Drive Smart, Maintain Smarter:** Your car will thank you with reliable service through countless hours in Nairobi's traffic.

**Quality Parts for Traffic Warriors:** PartsPOA stocks all the parts you need to keep your car traffic-ready. Free delivery in Nairobi.
    `
  },
  "new-vs-used-auto-parts-budget-guide": {
    title: "New vs Used Auto Parts: What's Best for Your Budget?",
    category: "Buying Guide",
    date: "October 12, 2025",
    readTime: "9 min read",
    content: `
# New vs Used Auto Parts: What's Best for Your Budget?

Facing a car repair and wondering whether to buy new or used parts? This comprehensive guide helps you make the smart choice for your situation and budget.

## Understanding Your Options

### New OEM Parts
Original Equipment Manufacturer parts, made by your car's manufacturer or their suppliers.

**Characteristics:**
- Brand new, never used
- Perfect fit guaranteed
- Full warranty (usually 6-12 months)
- Highest quality and reliability
- Premium pricing

### New Aftermarket Parts
New parts made by third-party manufacturers to similar specifications.

**Characteristics:**
- Brand new condition
- Good to excellent quality (depending on brand)
- Often come with warranties
- 30-60% cheaper than OEM
- Wide availability

### Used OEM Parts
Genuine parts removed from scrapped or donor vehicles.

**Characteristics:**
- Previously used, varying condition
- Correct fitment for your vehicle
- 50-80% cheaper than new OEM
- Limited or no warranty
- Unknown remaining lifespan

### Reconditioned Parts
Used parts that have been professionally restored.

**Characteristics:**
- Rebuilt to near-new condition
- Often come with warranties
- 40-70% cheaper than new
- Quality varies by rebuilder
- Common for alternators, starters, transmissions

## When to Choose New Parts

### Safety-Critical Components

**Never compromise on:**
- **Brakes:** Pads, rotors, calipers, brake lines
- **Suspension:** Shock absorbers, control arms, ball joints
- **Steering:** Tie rods, steering racks
- **Airbags:** Must be new, never used
- **Seatbelts:** Must be new if deploying mechanism activated

**Why:** Your safety and your passengers' safety are priceless.

### Cars Under Warranty

If your car is still under manufacturer warranty:
- Use only new OEM parts for covered repairs
- Used or aftermarket parts may void warranty
- Keep all receipts as proof

### High-Wear Components

Parts that wear quickly benefit from being new:
- Timing belts
- Water pumps
- Fuel pumps
- Oxygen sensors
- Spark plugs

**Reason:** The cost difference is small, but the reliability difference is huge.

### For Vehicles You Plan to Keep Long-Term

Investing in new parts makes sense if you're keeping your car for 5+ more years.

**Long-term benefits:**
- Extended reliability
- Better resale value
- Lower maintenance frequency
- Peace of mind

## When Used Parts Make Sense

### Body Panels and Exterior Parts

Perfect candidates for used parts:
- Doors
- Fenders
- Bumpers
- Hoods
- Trunk lids
- Headlight assemblies
- Mirrors

**Why:** These parts don't affect mechanical function, and you can inspect condition before buying.

### Interior Components

Good options for used:
- Seats (if in good condition)
- Dashboard components
- Door panels
- Center console
- Carpet sets
- Trim pieces

### Expensive Engine Components

For older vehicles (10+ years), used parts can save thousands:
- Complete engines
- Cylinder heads
- Transmissions
- Turbochargers

**Important:** Only from reputable wreckers with testing/warranty.

### Hard-to-Find Parts

For discontinued models or rare vehicles:
- Used may be your only option
- Check condition carefully
- Consider buying multiple if available

### Temporary Repairs

If you're:
- Planning to sell soon
- Keeping car only 6-12 more months
- Need a cheap fix to pass inspection
- Waiting for back-ordered new parts

## The Cost Comparison

Let's look at real Kenyan market prices:

### Example 1: Toyota Corolla Headlight
- New OEM: KES 15,000
- New Aftermarket: KES 8,000
- Used OEM: KES 4,000
- **Savings with used:** KES 11,000 (73%)

### Example 2: Honda Civic Door
- New OEM: KES 35,000
- Used OEM: KES 12,000
- **Savings with used:** KES 23,000 (66%)

### Example 3: Subaru Impreza Engine
- New/Rebuilt: KES 250,000
- Used (tested): KES 80,000
- **Savings with used:** KES 170,000 (68%)

### Example 4: Nissan X-Trail Transmission
- New: KES 180,000
- Reconditioned: KES 90,000
- Used: KES 60,000
- **Savings with used:** KES 120,000 (67%)

## Evaluating Used Parts

### Physical Inspection Checklist

✅ **Visual condition:**
- No cracks or breaks
- Minimal rust or corrosion
- Original paint/finish intact
- No signs of previous poor repair

✅ **Operational test (if possible):**
- Moving parts operate smoothly
- Electrical components function
- No unusual noises
- Proper resistance/continuity (electrical)

✅ **Matching specifications:**
- Correct part number
- Same year/model compatibility
- Identical connector types
- Proper sizing and fitment

### Questions to Ask Sellers

1. **"What was the mileage when this part was removed?"**
   - Lower mileage = better condition

2. **"Why was the vehicle scrapped?"**
   - Accident damage is better than mechanical failure

3. **"Does this part come with any warranty?"**
   - Even 1-2 weeks shows seller confidence

4. **"Can I return it if it doesn't work?"**
   - Fair sellers offer exchanges on faulty parts

5. **"Can I see it working before removal?" (if still in donor vehicle)**
   - Best way to verify functionality

### Red Flags

🚩 **No returns policy**
🚩 **Won't let you inspect before purchase**
🚩 **Unusually cheap (half of normal used price)**
🚩 **Missing identification numbers**
🚩 **Freshly painted (hiding damage?)**
🚩 **Seller can't answer basic questions**

## The Hidden Costs

Consider these factors in your decision:

### Labor Costs
If a part fails, you pay twice for:
- Removal of failed part
- Installation of replacement
- Diagnostic time

**Example:** Used alternator costs KES 5,000 but fails after 6 months.
- Part cost: KES 5,000
- First installation labor: KES 2,000
- Second installation labor: KES 2,000
- New alternator: KES 12,000
- **Total:** KES 21,000

**vs. Buying new initially:**
- Part cost: KES 12,000
- Installation: KES 2,000
- **Total:** KES 14,000

Sometimes "cheap" becomes expensive.

### Downtime Costs
- Lost work hours
- Uber/taxi expenses
- Rental car costs
- Family inconvenience

A reliable new part may be worth it if you can't afford downtime.

### Warranty Value

**New parts typically include:**
- 6-12 month warranty
- Free replacement if faulty
- Installation labor coverage (sometimes)

**Used parts:**
- 0-30 day warranty (if any)
- No labor coverage
- May need to prove it was defective

## Decision Framework

### Use This Flowchart:

**Is it a safety-critical part?**
→ Yes: Buy new
→ No: Continue

**Is your car under warranty?**
→ Yes: Buy new OEM
→ No: Continue

**Is it a high-wear part?**
→ Yes: Buy new
→ No: Continue

**Is it a body/interior part?**
→ Yes: Used is fine
→ No: Continue

**Can you afford new?**
→ Yes: Buy new for peace of mind
→ No: Buy quality used from reputable seller

### The 50% Rule

If a quality used part costs more than 50% of a new aftermarket part, buy new.

**Example:**
- New aftermarket brake caliper: KES 6,000
- Used OEM brake caliper: KES 4,000 (67% of new price)
- **Decision:** Buy new – small price difference, much better reliability

## Where to Buy in Kenya

### For New Parts:
1. **Online stores** (PartsPOA, others): Convenience, competitive prices
2. **Authorized dealers**: Best for warranty repairs
3. **Trusted shops**: Industrial Area, Ngara, local mechanics

### For Used Parts:
1. **Reputable wreckers**: Ngara, Kamukunji (inspect carefully)
2. **Online marketplaces**: Jiji, PigiaMe (meet in person, inspect thoroughly)
3. **Specialized used parts dealers**: Some offer tested parts with short warranties

## Conclusion: Making the Smart Choice

**Buy New When:**
- Safety is involved
- You're keeping the car long-term
- The car is under warranty
- It's a high-wear item
- You can't afford a failure
- The used price is >50% of new

**Buy Used When:**
- It's cosmetic/body work
- The car is old/high mileage
- You're selling soon
- New parts are very expensive
- You can thoroughly inspect
- You have a backup plan if it fails

**The Golden Rule:** Your decision should balance:
1. Immediate budget
2. Long-term costs
3. Safety requirements
4. Risk tolerance
5. Vehicle value and plans

**Smart Shopping:** Whether new or used, buy from reputable sellers who stand behind their products. PartsPOA offers both new quality parts and connects you with trusted suppliers.
    `
  },
  "common-car-problems-kenya-solutions": {
    title: "Common Car Problems in Kenya and How to Fix Them",
    category: "Repairs",
    date: "October 10, 2025",
    readTime: "12 min read",
    content: `
# Common Car Problems in Kenya and How to Fix Them

Kenyan roads and climate present unique challenges for vehicles. From dusty murram roads to heavy traffic and intense heat, our cars face conditions that accelerate certain problems. Here's your guide to the most common issues and their solutions.

## 1. Engine Overheating

### Why It Happens in Kenya:
- Heavy traffic with long idle times
- Hot climate, especially in Nairobi during dry season
- Climbing hills with full loads
- Clogged radiators from dusty conditions
- Poor quality or insufficient coolant

### Symptoms:
- Temperature gauge in red zone
- Steam from under the hood
- Sweet smell (coolant leaking)
- Engine warning light
- Loss of power

### Immediate Solutions:
1. **Pull over safely** – Don't continue driving
2. **Turn off AC** – Reduces engine load
3. **Turn heater on full blast** – Draws heat from engine
4. **Wait 20-30 minutes** before opening hood
5. **Check coolant level** when cool

### Long-term Fixes:
- **Radiator flush and clean:** KES 3,000-5,000
- **Replace coolant:** KES 1,500-2,500
- **Thermostat replacement:** KES 2,000-4,000
- **Water pump replacement:** KES 5,000-12,000
- **Radiator replacement:** KES 10,000-30,000

### Prevention:
- Check coolant monthly
- Service cooling system every 2 years
- Clean radiator fins regularly
- Don't overload vehicle, especially uphill
- Use quality coolant, not just water

## 2. Brake Problems

### Common in Kenya Because:
- Stop-and-go traffic
- Poorly maintained roads with sudden stops
- Overloading
- Poor quality brake parts

### Symptoms:
- Squealing or grinding noise
- Soft or spongy pedal
- Car pulls to one side
- Vibration when braking
- Brake warning light

### DIY Diagnosis:
- **Squealing:** Worn brake pads (replace urgently)
- **Grinding:** Metal-to-metal contact (dangerous!)
- **Soft pedal:** Air in brake lines or fluid leak
- **Pulling:** Uneven brake wear or seized caliper
- **Vibration:** Warped rotors

### Repair Costs:
- **Brake pads (front or rear):** KES 3,000-8,000
- **Brake rotors (pair):** KES 5,000-15,000
- **Brake fluid replacement:** KES 1,500-3,000
- **Caliper replacement:** KES 4,000-8,000 each
- **Complete brake service:** KES 15,000-35,000

### Prevention:
- Inspect brake pads every 10,000 km
- Replace brake fluid every 2 years
- Avoid sudden hard braking when possible
- Don't ride the brakes downhill
- Use genuine or quality aftermarket parts

## 3. Suspension Issues

### Why So Common:
- **Potholes!** Nairobi and upcountry roads are brutal
- Murram roads in many areas
- Speed bumps (especially poorly marked ones)
- Overloading beyond vehicle capacity

### Symptoms:
- Excessive bouncing or swaying
- Uneven tire wear
- Pulling to one side
- Clunking noises over bumps
- Nose-dive when braking

### Common Failures:
- Shock absorbers
- Bushings
- Ball joints
- Tie rod ends
- Control arms

### Repair Costs:
- **Shock absorbers (set of 4):** KES 12,000-30,000
- **Ball joints (pair):** KES 4,000-8,000
- **Bushings replacement:** KES 6,000-15,000
- **Tie rod ends (pair):** KES 3,000-6,000
- **Control arms:** KES 8,000-20,000 per arm

### Prevention:
- Slow down for potholes and bumps
- Don't overload your vehicle
- Regular alignment checks
- Inspect suspension annually
- Replace worn parts promptly

## 4. Electrical Problems

### Triggered By:
- Extreme heat affecting batteries
- Dust and moisture in connections
- Poor quality replacement parts
- Voltage irregularities

### Common Issues:
- Dead battery
- Dim or flickering lights
- Difficulty starting
- Alternator failure
- Blown fuses

### Troubleshooting:

**Won't Start:**
1. Check battery connections (clean if corroded)
2. Try jump start
3. If jump works: battery or alternator problem
4. If jump fails: starter or electrical system issue

**Dim Lights:**
1. Test battery voltage (should be 12.6V when off, 13.5-14.5V when running)
2. If low when running: alternator problem
3. If normal: check for loose connections

### Repair Costs:
- **Battery:** KES 6,000-15,000
- **Alternator:** KES 8,000-20,000
- **Starter motor:** KES 6,000-15,000
- **Electrical diagnostic:** KES 2,000-5,000

### Prevention:
- Clean battery terminals monthly
- Don't run heavy electronics with engine off
- Replace battery every 2-3 years
- Use quality electrical parts
- Keep connections dry and clean

## 5. Air Conditioning Failure

### Kenya-Specific Causes:
- Heavy use in hot climate
- Dust clogging cabin filters
- Refrigerant leaks from rough roads
- Poor servicing practices

### Symptoms:
- Weak airflow
- Warm air
- Unusual smells
- Noise when AC is on
- Water dripping inside car

### Quick Checks:
1. **Cabin air filter** (replace if black/clogged): KES 800-2,000
2. **Refrigerant level** (visible in sight glass on some cars)
3. **AC fuse** (check fuse box)
4. **Belt condition** (cracked or loose?)

### Repair Costs:
- **AC regas:** KES 3,000-6,000
- **Cabin filter replacement:** KES 800-2,000
- **AC service/cleaning:** KES 2,500-5,000
- **Compressor replacement:** KES 15,000-35,000
- **Condenser:** KES 8,000-20,000

### Maintenance:
- Run AC for 10 minutes weekly (even in cool weather)
- Service annually
- Replace cabin filter every 15,000 km
- Park in shade when possible
- Use recirculation mode in traffic

## 6. Tire Problems

### Common Issues:
- Punctures (nails, stones)
- Sidewall damage (potholes)
- Uneven wear (alignment issues)
- Dry rot (sun exposure)

### Warning Signs:
- Vibration at speed
- Pulling to one side
- Visible cracks or bulges
- Tread depth below 2mm
- Uneven wear patterns

### Costs:
- **Puncture repair:** KES 200-500
- **Tire replacement:** KES 4,000-15,000 per tire
- **Wheel alignment:** KES 1,500-3,000
- **Balancing:** KES 200-400 per tire

### Prevention:
- Check pressure monthly (including spare)
- Rotate tires every 10,000 km
- Alignment after hitting large potholes
- Replace when tread < 2mm
- Avoid overloading

## 7. Fuel System Issues

### Caused By:
- Poor quality fuel
- Contaminated fuel
- Clogged filters from dirty fuel
- Fuel pump failure

### Symptoms:
- Difficulty starting
- Engine stuttering or dying
- Loss of power
- Poor fuel economy
- Strong fuel smell

### Solutions:
- **Fuel filter replacement:** KES 1,500-3,000 (do every 40,000 km)
- **Fuel injector cleaning:** KES 3,000-8,000
- **Fuel pump replacement:** KES 6,000-15,000
- **Tank cleaning:** KES 3,000-6,000

### Prevention:
- Fill up at reputable stations
- Keep tank above 1/4 full
- Replace fuel filter on schedule
- Use fuel system cleaner occasionally
- Don't run tank empty (damages pump)

## 8. Clutch Problems (Manual Cars)

### Accelerated by Nairobi Traffic:
Heavy traffic means constant clutch use, reducing lifespan from 120,000 km to 60,000-80,000 km.

### Symptoms:
- Slipping (RPM increases without speed increase)
- Difficult gear changes
- Grinding when shifting
- Vibration or judder
- Burning smell

### Causes:
- Normal wear from traffic
- Riding the clutch
- Aggressive driving
- Oil leaks onto clutch

### Repair Cost:
- **Clutch kit replacement:** KES 15,000-40,000 (including labor)

### Extending Clutch Life:
- Use neutral at long stops
- Don't rest foot on pedal
- Smooth engagement
- Don't slip clutch to hold on hills
- Regular transmission service

## 9. Water Damage

### Common During Rainy Season:
- Flooded roads in Nairobi
- Driving through deep puddles
- Water entering engine

### Immediate Actions if You Drive Through Water:
1. **Don't restart if engine dies!** (can cause catastrophic damage)
2. Tow to mechanic
3. Have them check for water in engine
4. Dry out electrical components

### Repair Costs (if hydrolocked):
- Minor: KES 10,000-30,000
- Severe: KES 100,000-300,000+ (engine rebuild/replacement)

### Prevention:
- Avoid flooded roads
- If you must go through water:
  - Go slow (walking pace)
  - Keep engine running (constant throttle)
  - Test brakes after exiting water
- Know your vehicle's wading depth

## 10. Emissions/Check Engine Light

### Triggers:
- Faulty oxygen sensors
- Catalytic converter issues
- Mass airflow sensor problems
- Loose gas cap
- Emissions system leaks

### What to Do:
1. Check if gas cap is tight
2. If light persists, get diagnostic scan
3. Address codes promptly

### Diagnostic Cost:
- **Code reading:** KES 500-1,500
- **Common fixes:** KES 2,000-20,000 depending on issue

## DIY vs Professional Repair

### You Can Handle:
✅ Checking fluids
✅ Replacing air filters
✅ Changing bulbs
✅ Checking tire pressure
✅ Basic cleaning and inspection

### Leave to Professionals:
❌ Brake system work
❌ Engine internals
❌ Transmission work
❌ Electrical diagnosis
❌ AC servicing

## Emergency Kit for Kenya

Keep in your car:
- Jumper cables
- Basic tools (screwdrivers, pliers, wrench set)
- Spare fuses
- Flashlight
- Emergency triangle
- Water (for radiator and drinking)
- Phone charger
- Mechanic's phone number

## Finding a Good Mechanic

Red flags:
🚩 Can't explain the problem clearly
🚩 Insists on expensive fixes without diagnosis
🚩 Won't show you the faulty parts
🚩 Prices vary wildly each visit
🚩 Always finds "one more problem"

Good signs:
✅ Explains issues clearly
✅ Shows you the problem
✅ Provides written estimates
✅ Uses quality parts
✅ Stands behind their work

## Conclusion

Most car problems in Kenya are predictable and preventable. The key is:

1. **Regular maintenance** (don't skip services)
2. **Quality parts** (cheap parts = expensive repairs)
3. **Defensive driving** (avoid potholes, don't overload)
4. **Early intervention** (small problems become big ones)
5. **Good mechanic relationship** (find someone trustworthy)

**Budget Wisely:** Set aside KES 3,000-5,000 monthly for maintenance. This prevents KES 50,000-100,000 emergency repairs.

**Quality Parts Matter:** Using genuine or quality aftermarket parts means fewer breakdowns and lower long-term costs.

**Stay Informed:** Understanding your car helps you communicate with mechanics and avoid unnecessary repairs.

**PartsPOA Pro Tip:** Stock up on commonly needed parts (air filter, oil filter, brake pads) when you find good deals. You'll need them eventually, and having them ready saves time during repairs.

**Drive Safe, Maintain Smart:** Kenya's roads are challenging, but with proper care, your car can serve you reliably for years.
    `
  }
};

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const article = articles[params.slug];
  
  if (!article) {
    return {
      title: "Article Not Found | PartsPOA Blog"
    };
  }

  return {
    title: `${article.title} | PartsPOA Blog`,
    description: article.content.substring(0, 160),
  };
}

export default function BlogArticlePage({ params }: PageProps) {
  const article = articles[params.slug];

  if (!article) {
    notFound();
  }

  // Simple markdown-to-HTML converter (basic implementation)
  const renderContent = (markdown: string) => {
    return markdown
      .split('\n')
      .map((line, i) => {
        // Headers
        if (line.startsWith('# ')) {
          return <h1 key={i} className="text-4xl font-bold mb-6 mt-8">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={i} className="text-3xl font-bold mb-4 mt-8">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={i} className="text-2xl font-semibold mb-3 mt-6">{line.substring(4)}</h3>;
        }
        if (line.startsWith('#### ')) {
          return <h4 key={i} className="text-xl font-semibold mb-2 mt-4">{line.substring(5)}</h4>;
        }
        // Bold text
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={i} className="font-bold mb-2">{line.slice(2, -2)}</p>;
        }
        // Lists
        if (line.startsWith('- ')) {
          return <li key={i} className="ml-6 mb-1">{line.substring(2)}</li>;
        }
        // Empty line
        if (line.trim() === '') {
          return <div key={i} className="h-4"></div>;
        }
        // Regular paragraph
        return <p key={i} className="mb-4 leading-relaxed text-gray-700">{line}</p>;
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <Badge className="mb-4">{article.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{article.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image Placeholder */}
        <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg mb-8 flex items-center justify-center text-white">
          <span className="text-sm">Featured image placeholder</span>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 prose prose-lg max-w-none">
          {renderContent(article.content)}
        </div>

        {/* Share Buttons */}
        <div className="mt-8 flex items-center gap-4">
          <span className="font-medium">Share this article:</span>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
        </div>

        {/* Related Articles */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Related Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/blog" className="block hover:bg-gray-50 p-3 rounded-lg transition-colors">
                <h3 className="font-semibold text-blue-600">Browse All Articles →</h3>
                <p className="text-sm text-gray-600">Explore more car maintenance tips and buying guides</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}
