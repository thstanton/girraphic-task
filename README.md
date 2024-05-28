# Tim Stanton - Girraphic Task for Junior Software Developer Role

## Overview

Task: Media Information System with Data Export

You have been provided a JSON file that contains the results of a running race. Your task is to create a “Media Information System” that displays the athletes and their results in a user interface that is easily readable for sports commentators or other media personnel. You also need to provide the user with the ability to export the results data to a CSV file in a specific format.

## Approach

# Stack

I decided to use TypeScript, React, Vite and Tailwind for this task, as these are tools that I am most confident with. I also added testing with Vitest/JSDOM/React-Testing-Library.

# Displaying the Data

I began by looking at the examples provided and the Girraphic website to get an idea of the branding. Then I focused on getting the data to display correctly. I created types for Results and Athletes to enable type-safety and autocomplete, and created a simple wrapper to import the results.json file, type it and export it as an object.

After importing the data, I began to build the components to display it. A table seemed like the clearest way to display the data (on larger screens at least), so I built the table as one component and the row as a second component. I used states to keep track of the current sort order (bibs/rank, asc/desc) and created a `sortedAthletes` variable which is ordered based on the state variables. It is the `sortedAthletes` array which is iterated over to display the rows of the table.

# Flags

Rather than displaying the flag as a country code, I thought it would be much more visually appealing and easier to parse to display the flags as images. I found FlagCDN, created by [Flagpedia](https://flagpedia.net) as a straightforward way to achieve this. It offers a CDN which returns the country's flag when the country code is provided in the URL. The only difficulty was that the country codes were provided in the data as 3-character codes (ISO 3166-1 alpha-3), whereas the CDN required a 2-character code (ISO 3166 alpha-2). I created a simple `convertCountryCode(flag)` function, which takes the 3-character code and returns the 2-character code. I also realised that the South African country code provided in the data was non-standard (RSA vs ZAF), so I added this to the lookup table and also made the function return the text if the 2-character code did not exist in the lookup table.

```ts
  <img
    src={`https://flagcdn.com/32x24/${convertCountryCode(flag)}.png`}
    width="16"
    height="12"
    alt={`${countryname} flag`}
    className="mx-auto h-fit w-4"
  />
```

# Styling

I tried to use a colour scheme which is similar to the Girraphic website, as well as using the logo and certain motifs, such as the thin yellow lines as dividers and accents. In order to make the data easy to read, I ensured that there is a clear hierarchy of content using spacing, font size and colour. I added lozenges to the bib numbers to differentiate them for the ranks more clearly, with the design reminiscent of an actual bib number worn by runners. I also added lozenges, with conditional styling to colour code runners who have 'completed', 'in progress' or 'DNF'. I also thought it would be useful for the user to clearly mark out runners in podium positions, so I conditionally added emoji medals to ranks 1, 2 and 3, and slightly differentiated their backgorund colour, border and text weight in the table styling.

# Download CSV

I implemented this functionality by creating a function which formats the data in CSV format, storing the CSV string in a Blob object, creating an object URL, creating a link to the object URL and programmatically 'clicking' it to initiate the download.

# Mobile Styling

I designed the header sections to be mobile-friendly using flex, however this did not work for the table, so I decided to create a separate card format for displaying the data on mobile. As many of the elements from the table could be reused (such as the flags, bib numbers and ranks), I extrapolated them out into their own components and reused them.

# Testing

Finally, I installed Vitest and supporting libraries such as JSDom, @testing-library/react and @testing-library/jest-dom, to build some unit tests for the functionality. Creating the test for the CSV download was challenging, as I needed to learn about mocking - which was a concept that I was aware of but had not used myself.

The resulting function mocks browser objects that Node.js does not have access to in order to test that the Blob is created correctly with the correct content and that the link is created and 'clicked'. I suspect there may be ways to improve this!
