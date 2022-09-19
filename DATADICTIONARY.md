# Data Dictionary for OSRS PriceWatcher

# Variables / Arguments / Params

## itemID

- Defined and used in /API.js
- Value represents a number
- Used as argument for API calls for specific items and their information
- Value is defined by Runescape wiki APIs and represents a static value

## timeStep

- Defined and used in /API.js
- Value represents a string
- Used as argument for API calls for predetermined time peroids and pertinent time-based data
- Value is defined by Runescape wiki APIs and represents a time period to base fetched information from

## id

- Defined and used in /FavouritesTable.js
- Value represents a number
- Used to identify individual items and pertains to existed identification values determined by information returned from API calls
- Value is defined by the project but based off predetermined API information

## favIcon

- Defined in /addFavourite.js
- Imported in /ItemsTable.js
- Value contains html for svg element
- Used for a button to indicate the function of favouriting an item
- Tied to the addFavourite function

## unfavIcon

- Defined in /removeFavourite.js
- Imported in /FavouritesTable.js
- Value contains html for svg element
- Used for a button to indicate the function of removing an item from favourites
- Tied to the removeFavourite function

# Functions / Hooks

## itemDetailUrl(itemID)

- Defined in /API.js
- Function calls an API which returns information on specific items
- Specific information includes:
  - Image url
  - Item id
  - Item name
  - Text description
  - Buy limit
- Function is used to obtain and visualize data relevant to the buying and selling of items

## itemTimestampUrl(itemID, timeStep)

- Defined in /API.js
- Function calls an API which returns data regarding both the prices and volume of purchases pertaining to each item in Runescape
- Specific information includes:
  - Item id
  - Unix timestamp of following information:
    - High selling price
    - High selling price's volume
    - Low selling price
    - Low selling price's volume
- Function is used to obtain and visualize data in order to inform of trends in an item(s) purchase

## itemImage(itemID)

- Defined in /API.js
- Function calls an API which returns a url for a specific item's image
- Function is used to show the visual component to an item

## removeFavourite(id)

- Defined in /FavouritesTable.js
- Function is used to remove a "favourited" item from the favourites list
- Uses the item's id as argument
- Function returns out if the argument item is not on the favourites list
- Function filters out and returns the list of favourites without the argument item if the argument item is found

# Components

## FavouritesTable()

- Defined in /FavouritesTable.js
- imported in /FavouritesTable/index.js
- Component is a table of "favourited" items from ProductsTable
- Users Create a table of items and their information is displayed on the page
- Page is used as a way to specifically track buy/sell data for items of their choosing

## Footer()

- Defined in /Footer.js
- Component is a footer containing a link to the author's (my) github repository and the year of the project's creation

## ItemDetails()

- Defined in /ItemDetails.js
- Component is a page that gives in depth data regarding a specific item's buy and sell statistics
- Contains Area and Bar graphs via graphing libraries to chart trends
- Page is a way to view detailed information on an item the user is interested in
