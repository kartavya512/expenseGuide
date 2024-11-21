import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";

function NameAndSign({ setNameOpen }) {
  const [name, setName] = useState(""); // State to hold the entered name
  const [currency, setCurrency] = useState(""); // State to hold the selected currency
  const [countrySearch, setCountrySearch] = useState(""); // State for filtering countries
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Sample data for countries and currencies
  const countries = [
    { name: "Afghanistan", currency: "AFN", symbol: "؋" },
    { name: "Albania", currency: "ALL", symbol: "L" },
    { name: "Algeria", currency: "DZD", symbol: "د.ج" },
    { name: "Andorra", currency: "EUR", symbol: "€" },
    { name: "Angola", currency: "AOA", symbol: "Kz" },
    { name: "Argentina", currency: "ARS", symbol: "$" },
    { name: "Armenia", currency: "AMD", symbol: "֏" },
    { name: "Australia", currency: "AUD", symbol: "$" },
    { name: "Austria", currency: "EUR", symbol: "€" },
    { name: "Azerbaijan", currency: "AZN", symbol: "₼" },
    { name: "Bahamas", currency: "BSD", symbol: "$" },
    { name: "Bahrain", currency: "BHD", symbol: ".د.ب" },
    { name: "Bangladesh", currency: "BDT", symbol: "৳" },
    { name: "Barbados", currency: "BBD", symbol: "$" },
    { name: "Belarus", currency: "BYN", symbol: "Br" },
    { name: "Belgium", currency: "EUR", symbol: "€" },
    { name: "Belize", currency: "BZD", symbol: "$" },
    { name: "Benin", currency: "XOF", symbol: "CFA" },
    { name: "Bhutan", currency: "BTN", symbol: "Nu." },
    { name: "Bolivia", currency: "BOB", symbol: "Bs." },
    { name: "Bosnia and Herzegovina", currency: "BAM", symbol: "KM" },
    { name: "Botswana", currency: "BWP", symbol: "P" },
    { name: "Brazil", currency: "BRL", symbol: "R$" },
    { name: "Brunei", currency: "BND", symbol: "$" },
    { name: "Bulgaria", currency: "BGN", symbol: "лв" },
    { name: "Burkina Faso", currency: "XOF", symbol: "CFA" },
    { name: "Burundi", currency: "BIF", symbol: "FBu" },
    { name: "Cabo Verde", currency: "CVE", symbol: "$" },
    { name: "Cambodia", currency: "KHR", symbol: "៛" },
    { name: "Cameroon", currency: "XAF", symbol: "CFA" },
    { name: "Canada", currency: "CAD", symbol: "$" },
    { name: "Central African Republic", currency: "XAF", symbol: "CFA" },
    { name: "Chad", currency: "XAF", symbol: "CFA" },
    { name: "Chile", currency: "CLP", symbol: "$" },
    { name: "China", currency: "CNY", symbol: "¥" },
    { name: "Colombia", currency: "COP", symbol: "$" },
    { name: "Comoros", currency: "KMF", symbol: "CF" },
    { name: "Congo", currency: "CDF", symbol: "FC" },
    { name: "Costa Rica", currency: "CRC", symbol: "₡" },
    { name: "Croatia", currency: "HRK", symbol: "kn" },
    { name: "Cuba", currency: "CUP", symbol: "₱" },
    { name: "Cyprus", currency: "EUR", symbol: "€" },
    { name: "Czech Republic", currency: "CZK", symbol: "Kč" },
    { name: "Denmark", currency: "DKK", symbol: "kr" },
    { name: "Djibouti", currency: "DJF", symbol: "Fdj" },
    { name: "Dominican Republic", currency: "DOP", symbol: "RD$" },
    { name: "Ecuador", currency: "USD", symbol: "$" },
    { name: "Egypt", currency: "EGP", symbol: "£" },
    { name: "El Salvador", currency: "USD", symbol: "$" },
    { name: "Equatorial Guinea", currency: "XAF", symbol: "CFA" },
    { name: "Eritrea", currency: "ERN", symbol: "Nfk" },
    { name: "Estonia", currency: "EUR", symbol: "€" },
    { name: "Eswatini", currency: "SZL", symbol: "E" },
    { name: "Ethiopia", currency: "ETB", symbol: "Br" },
    { name: "Fiji", currency: "FJD", symbol: "$" },
    { name: "Finland", currency: "EUR", symbol: "€" },
    { name: "France", currency: "EUR", symbol: "€" },
    { name: "Gabon", currency: "XAF", symbol: "CFA" },
    { name: "Gambia", currency: "GMD", symbol: "D" },
    { name: "Georgia", currency: "GEL", symbol: "₾" },
    { name: "Germany", currency: "EUR", symbol: "€" },
    { name: "Ghana", currency: "GHS", symbol: "₵" },
    { name: "Greece", currency: "EUR", symbol: "€" },
    { name: "Grenada", currency: "XCD", symbol: "$" },
    { name: "Guatemala", currency: "GTQ", symbol: "Q" },
    { name: "Guinea", currency: "GNF", symbol: "FG" },
    { name: "Guinea-Bissau", currency: "XOF", symbol: "CFA" },
    { name: "Guyana", currency: "GYD", symbol: "$" },
    { name: "Haiti", currency: "HTG", symbol: "G" },
    { name: "Honduras", currency: "HNL", symbol: "L" },
    { name: "Hungary", currency: "HUF", symbol: "Ft" },
    { name: "Iceland", currency: "ISK", symbol: "kr" },
    { name: "India", currency: "INR", symbol: "₹" },
    { name: "Indonesia", currency: "IDR", symbol: "Rp" },
    { name: "Iran", currency: "IRR", symbol: "﷼" },
    { name: "Iraq", currency: "IQD", symbol: "ع.د" },
    { name: "Ireland", currency: "EUR", symbol: "€" },
    { name: "Israel", currency: "ILS", symbol: "₪" },
    { name: "Italy", currency: "EUR", symbol: "€" },
    { name: "Jamaica", currency: "JMD", symbol: "$" },
    { name: "Japan", currency: "JPY", symbol: "¥" },
    { name: "Jordan", currency: "JOD", symbol: "د.ا" },
    { name: "Kazakhstan", currency: "KZT", symbol: "₸" },
    { name: "Kenya", currency: "KES", symbol: "KSh" },
    { name: "Kiribati", currency: "AUD", symbol: "$" },
    { name: "Kuwait", currency: "KWD", symbol: "د.ك" },
    { name: "Kyrgyzstan", currency: "KGS", symbol: "лв" },
    { name: "Laos", currency: "LAK", symbol: "₭" },
    { name: "Latvia", currency: "EUR", symbol: "€" },
    { name: "Lebanon", currency: "LBP", symbol: "ل.ل" },
    { name: "Lesotho", currency: "LSL", symbol: "L" },
    { name: "Liberia", currency: "LRD", symbol: "$" },
    { name: "Libya", currency: "LYD", symbol: "ل.د" },
    { name: "Lithuania", currency: "EUR", symbol: "€" },
    { name: "Luxembourg", currency: "EUR", symbol: "€" },
    { name: "Madagascar", currency: "MGA", symbol: "Ar" },
    { name: "Malawi", currency: "MWK", symbol: "MK" },
    { name: "Malaysia", currency: "MYR", symbol: "RM" },
    { name: "Maldives", currency: "MVR", symbol: "Rf" },
    { name: "Mali", currency: "XOF", symbol: "CFA" },
    { name: "Malta", currency: "EUR", symbol: "€" },
    { name: "Marshall Islands", currency: "USD", symbol: "$" },
    { name: "Mauritania", currency: "MRU", symbol: "UM" },
    { name: "Mauritius", currency: "MUR", symbol: "₨" },
    { name: "Mexico", currency: "MXN", symbol: "$" },
    { name: "Micronesia", currency: "USD", symbol: "$" },
    { name: "Moldova", currency: "MDL", symbol: "L" },
    { name: "Monaco", currency: "EUR", symbol: "€" },
    { name: "Mongolia", currency: "MNT", symbol: "₮" },
    { name: "Montenegro", currency: "EUR", symbol: "€" },
    { name: "Morocco", currency: "MAD", symbol: "د.م." },
    { name: "Mozambique", currency: "MZN", symbol: "MT" },
    { name: "Myanmar", currency: "MMK", symbol: "K" },
    { name: "Namibia", currency: "NAD", symbol: "$" },
    { name: "Nauru", currency: "AUD", symbol: "$" },
    { name: "Nepal", currency: "NPR", symbol: "₨" },
    { name: "Netherlands", currency: "EUR", symbol: "€" },
    { name: "New Zealand", currency: "NZD", symbol: "$" },
    { name: "Nicaragua", currency: "NIO", symbol: "C$" },
    { name: "Niger", currency: "XOF", symbol: "CFA" },
    { name: "Nigeria", currency: "NGN", symbol: "₦" },
    { name: "North Korea", currency: "KPW", symbol: "₩" },
    { name: "North Macedonia", currency: "MKD", symbol: "ден" },
    { name: "Norway", currency: "NOK", symbol: "kr" },
    { name: "Oman", currency: "OMR", symbol: "ر.ع." },
    { name: "Pakistan", currency: "PKR", symbol: "₨" },
    { name: "Palau", currency: "USD", symbol: "$" },
    { name: "Panama", currency: "PAB", symbol: "B/." },
    { name: "Papua New Guinea", currency: "PGK", symbol: "K" },
    { name: "Paraguay", currency: "PYG", symbol: "₲" },
    { name: "Peru", currency: "PEN", symbol: "S/." },
    { name: "Philippines", currency: "PHP", symbol: "₱" },
    { name: "Poland", currency: "PLN", symbol: "zł" },
    { name: "Portugal", currency: "EUR", symbol: "€" },
    { name: "Qatar", currency: "QAR", symbol: "ر.ق" },
    { name: "Romania", currency: "RON", symbol: "lei" },
    { name: "Russia", currency: "RUB", symbol: "₽" },
    { name: "Rwanda", currency: "RWF", symbol: "FRw" },
    { name: "Saint Kitts and Nevis", currency: "XCD", symbol: "$" },
    { name: "Saint Lucia", currency: "XCD", symbol: "$" },
    { name: "Saint Vincent and the Grenadines", currency: "XCD", symbol: "$" },
    { name: "Samoa", currency: "WST", symbol: "WS$" },
    { name: "San Marino", currency: "EUR", symbol: "€" },
    { name: "Sao Tome and Principe", currency: "STN", symbol: "Db" },
    { name: "Saudi Arabia", currency: "SAR", symbol: "﷼" },
    { name: "Senegal", currency: "XOF", symbol: "CFA" },
    { name: "Serbia", currency: "RSD", symbol: "din" },
    { name: "Seychelles", currency: "SCR", symbol: "₨" },
    { name: "Sierra Leone", currency: "SLL", symbol: "Le" },
    { name: "Singapore", currency: "SGD", symbol: "$" },
    { name: "Slovakia", currency: "EUR", symbol: "€" },
    { name: "Slovenia", currency: "EUR", symbol: "€" },
    { name: "Solomon Islands", currency: "SBD", symbol: "$" },
    { name: "Somalia", currency: "SOS", symbol: "S" },
    { name: "South Africa", currency: "ZAR", symbol: "R" },
    { name: "South Korea", currency: "KRW", symbol: "₩" },
    { name: "South Sudan", currency: "SSP", symbol: "£" },
    { name: "Spain", currency: "EUR", symbol: "€" },
    { name: "Sri Lanka", currency: "LKR", symbol: "₨" },
    { name: "Sudan", currency: "SDG", symbol: "ج.س." },
    { name: "Suriname", currency: "SRD", symbol: "$" },
    { name: "Sweden", currency: "SEK", symbol: "kr" },
    { name: "Switzerland", currency: "CHF", symbol: "CHF" },
    { name: "Syria", currency: "SYP", symbol: "£" },
    { name: "Taiwan", currency: "TWD", symbol: "$" },
    { name: "Tajikistan", currency: "TJS", symbol: "SM" },
    { name: "Tanzania", currency: "TZS", symbol: "Sh" },
    { name: "Thailand", currency: "THB", symbol: "฿" },
    { name: "Togo", currency: "XOF", symbol: "CFA" },
    { name: "Tonga", currency: "TOP", symbol: "T$" },
    { name: "Trinidad and Tobago", currency: "TTD", symbol: "$" },
    { name: "Tunisia", currency: "TND", symbol: "د.ت" },
    { name: "Turkey", currency: "TRY", symbol: "₺" },
    { name: "Turkmenistan", currency: "TMT", symbol: "m" },
    { name: "Tuvalu", currency: "AUD", symbol: "$" },
    { name: "Uganda", currency: "UGX", symbol: "USh" },
    { name: "Ukraine", currency: "UAH", symbol: "₴" },
    { name: "United Arab Emirates", currency: "AED", symbol: "د.إ" },
    { name: "United Kingdom", currency: "GBP", symbol: "£" },
    { name: "United States", currency: "USD", symbol: "$" },
    { name: "Uruguay", currency: "UYU", symbol: "$U" },
    { name: "Uzbekistan", currency: "UZS", symbol: "so'm" },
    { name: "Vanuatu", currency: "VUV", symbol: "VT" },
    { name: "Venezuela", currency: "VES", symbol: "Bs." },
    { name: "Vietnam", currency: "VND", symbol: "₫" },
    { name: "Yemen", currency: "YER", symbol: "﷼" },
    { name: "Zambia", currency: "ZMW", symbol: "ZK" },
    { name: "Zimbabwe", currency: "ZWL", symbol: "$" },
  ];

  const handleCountrySearch = (e) => {
    const search = e.target.value;
    setCountrySearch(search);
    if (search.length > 0) {
      const filtered = countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };

  const handleCountrySelect = (country) => {
    setCurrency(country.currency);
    setCountrySearch(country.symbol);
    setFilteredCountries([]); // Close the dropdown
  };

  const handleSave = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Update the user's profile with the new display name
      if (name != "") {
        updateProfile(user, {
          displayName: name, // This will set the display name to what the user entered
        })
          .then(() => {
            console.log("Display name updated successfully!");
            setNameOpen(false); // Close the form after saving
          })
          .catch((error) => {
            console.error("Error updating display name:", error);
            //setNameOpen(false);
          });
      } else {
        setNameOpen(false);
      }
    }
  };

  return (
    <div>
      <div className="pt-20 flex justify-center">
        <div className="">
          <div className="text-xl">What's your awesome name?</div>
          <div className="pt-5"></div>
          <input
            className="w-full p-2 rounded-md placeholder:p-1 text-gray-800 placeholder:text-gray-800 focus:outline-none focus:ring-0"
            placeholder="Enter your name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Capture the name input
          />
          <div className="text-xl pt-10">Pick your preferred currency:</div>
          <div className="pt-5"></div>
          <input
            className="w-full p-2 rounded-md placeholder:p-1 text-gray-800 placeholder:text-gray-800 focus:outline-none focus:ring-0"
            placeholder="Search for a country"
            type="search"
            value={countrySearch}
            onChange={handleCountrySearch} // Filter the country list based on input
          />
          {filteredCountries.length > 0 && (
            <div className="bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto text-black">
              {filteredCountries.map((country) => (
                <div
                  key={country.name}
                  onClick={() => handleCountrySelect(country)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {country.name} - {country.currency} - {country.symbol}
                </div>
              ))}
            </div>
          )}
          <div className="pt-20"></div>
          <button
            onClick={handleSave}
            className="bg-green-400 p-2 rounded-md w-full"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NameAndSign;
