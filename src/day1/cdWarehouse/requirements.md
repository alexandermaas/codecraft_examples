# CD Warehouse

# Requirements
- Customers can buy CDs, searching on the title and the artist. 
- The credit card payment is processed by an external provider. 
- Warehouse receives batches of CDs from the record labels. 
- Warehouse keeps a stock count of how many copies of each title are in the warehouse.
- Customers can leave reviews for CDs they’ve bought through the warehouse, which gives each title an integer rating from 1- 10 and the text of their review if they want to say more.

# Test-List
The following actions are identified.

## Buy:
- [x] Payment successful
- [x] Payment declined
- [x] Stock insufficient 

## Search:
- [x] Match with title and artist
- [x] No match

## Receive:
- [ ] Cd with existing title is added to warehouse
- [ ] Cd with new title is added to warehouse
- [ ] Multiple cds with multiple titles are received

## Review:
- [ ] Only rating is applied
- [ ] Rating and review are applied

