import { useState, useEffect } from "react";
import Table from "./components/Table";
import Modal from "./components/Modal";
import { FiRotateCcw } from 'react-icons/fi';
// Sample dish data (name and price)
const dishes = [
  { name: "M1", price: 11.9 },
  { name: "M2a.Mit Tofu", price: 10.9 },
  { name: "M2b.Mit gebratem Hähnchen", price: 11.9 },
  { name: "M3", price: 9.5 },
  { name: "M4", price: 9.5 },
  { name: "M5", price: 8.5 },
  { name: "M6", price: 10.5 },
  { name: "M7", price: 10.9 },
  { name: "M8a.Mit Tofu", price: 10.5 },
  { name: "M8b.Mit Tofu", price: 11.9 },
  { name: "M9", price: 11.9 },
  { name: "Kinder Menu 1", price: 8 },
  { name: "Kinder Menu 2", price: 9 },
  { name: "B1.Duftreis", price: 2 },
  { name: "B2.SüBkartoffel", price: 2.5 },
  { name: "B3.Reisnudeln", price: 2 },
  { name: "B4.Udon Nudeln", price: 3 },
  { name: "B5.Extra Sauce", price: 1 },
  { name: "D1.Mochi Eis", price: 7.5 },
  { name: "D2.Grüntee Eis", price: 6.9 },
  { name: "D3.Mango Reis", price: 8.5 },
  { name: "D4.Chuoi chien", price: 7.5 },


  { name: "02a.Kokossupe Tofu", price: 5.9 },
  { name: "02c.Kokossuppe Hähnchen", price: 6.9 },
  { name: "02e.Kokossuppe Garnelen", price: 6.9 },
  { name: "01a.Misosuppe Tofu", price: 5.5 },
  { name: "01L.Misosuppe Lachs", price: 7 },
  { name: "03.Tom Yum Suppe ", price: 7.5 },
  { name: "04a.Sommerrollen", price: 6.5 },
  { name: "04c.Sommerrollen", price: 7 },
  { name: "04e.Sommerrollen", price: 7.5 },
  { name: "05a.Frühlingsrollen", price: 5.9 },
  { name: "05b.Frühlingsrollen Vegan", price: 6.5 },
  { name: "07.Gyoza ", price: 6.5 },

  { name: "10a.Ha Cao ", price: 6.5 },
  { name: "10b.Ha Cao ", price: 7.5 },
  { name: "08.Yakitorisose", price: 6.5 },
  { name: "09.Ebi Tempura", price: 7.2 },
  { name: "11.Tom Chien Com", price: 7.5 },
  { name: "12.Rice Mix Platte", price: 29.5 },
  { name: "13.Khoai Lang Chien", price: 2.9 },
  { name: "14a.Banh Bao Chay", price: 6.9 },
  { name: "14b.Banh Bao Thit", price: 6.9 },
  { name: "15.Edamame", price: 6.5 },
  { name: "16.Seetangsalat ", price: 5.5 },
  { name: "17a.Mangosalat", price: 6.5 },
  { name: "17b.MangoSalat", price: 7.5 },
  { name: "18a.Papaya Salat", price: 7.5 },
  { name: "18b.Papaya Salat", price: 8.5 },
  { name: "19.Hänchensalat", price: 6.9 },
  { name: "21.Kimchi-Salat", price: 5.5 },
  { name: "20.Ricesalat", price: 7 },

  { name: "37a.Pho Curry Tofu", price: 13.9 },
  { name: "37b.Pho Curry Rindfleisch", price: 14.9 },
  { name: "37c.Pho Curry Hähnchen", price: 15 },
  { name: "37e.Pho Curry Garnelen", price: 17.5 },
  { name: "38a.Udon Kokos Tofu", price: 13.9 },
  { name: "38b.Udon Kokos Rindfleisch", price: 14.9 },
  { name: "38c.Udon Kokos Hähnchen", price: 15 },
  { name: "38e.Udon Kokos Garnelen", price: 17.5 },

  { name: "39a.Ramen Tofu", price: 13.9 },
  { name: "39b.Ramen Rindfleisch", price: 14.9 },
  { name: "39c.Ramen Hähnchen", price: 15 },
  { name: "39e.Ramen Garnelen", price: 17.5 },

  { name: "24.RicespieSe", price: 15.5 },
  { name: "25.Gruncurry", price: 13.9 },
  { name: "26.Tom Chien Com", price: 17.5 },
  { name: "27.Tom Chien Xu", price: 17.5 },
  { name: "28b.Chao Rindfleisch", price: 14.9 },
  { name: "28c.Chao Hähnchen", price: 13.9 },
  { name: "28e.Chao Garnelen", price: 17.5 },


  { name: "31a.Cha la lot", price: 13.9 },
  { name: "31b.Cha la lot", price: 14.9 },
  { name: "32a.Bun Nam Bo", price: 13.5 },
  { name: "32b.Bun Nam Bo", price: 15.5 },
  { name: "32c.Bun Nam Bo gegrillte Hähnchen", price: 15 },
  { name: "32c.Bun Nam Bo geback Hähnchen", price: 15 },
  { name: "33a.Bun Nem Vegan", price: 13.9 },
  { name: "33b.Bun Nem", price: 14.5 },
  { name: "34.Bun Cha Nuong", price: 15.9 },
  { name: "35.Bun Hai San", price: 16.9 },
  { name: "36a.Pho Tofu", price: 13.9 },
  { name: "36b.Pho Rindfleisch", price: 14.9 },
  { name: "36c.Pho Hähnchen", price: 14.5 },


  { name: "40a.Gebraten Udon-Nudeln Tofu", price: 13.9 },
  { name: "40b.Gebraten Udon-Nudeln Rind", price: 14.9 },
  { name: "40c.Gebraten Udon-Nudeln gegrillte Hähnchen", price: 14.5 },
  { name: "40c.Gebraten Udon-Nudeln gebacken Hähnchen", price: 14.5 },
  { name: "40d.Gebraten Udon-Nudeln Ente", price: 17.2 },
  { name: "40e.Gebraten Udon-Nudeln Garnelen", price: 17.5 },

  { name: "41a.Erdnussauce Tofu", price: 13.9 },
  { name: "41a.Erdnussauce Tofu Tempura", price: 14.5 },
  { name: "41b.Erdnussauce Rindfleisch", price: 14.9 },
  { name: "41c.Erdnussauce gegrillte Hähnchen", price: 15 },
  { name: "41c.Erdnussauce gebacken Hähnchen", price: 15 },
  { name: "41d.Erdnussauce Ente", price: 17.2 },
  { name: "41e.Erdnussauce Garnelen", price: 17.5 },

  { name: "42a.Sot Xa Tofu", price: 13.9 },
  { name: "42a.Sot Xa Tofu Tempura", price: 14.5 },
  { name: "42b.Sot Xa Rindfleisch", price: 14.9 },
  { name: "42c.Sot Xa gegrillte Hähnchen", price: 15 },
  { name: "42c.Sot Xa gebacken Hähnchen", price: 15 },
  { name: "42d.Sot Xa Ente", price: 17.2 },
  { name: "42e.Sot Xa Garnelen", price: 17.5 },

  { name: "43a.Curry Sauce Tofu", price: 13.9 },
  { name: "43a.Curry Sauce Tofu Tempura", price: 14.5 },
  { name: "43b.Curry Sauce Rindfleisch", price: 14.9 },
  { name: "43c.Curry Sauce gegrillte Hähnchen", price: 15 },
  { name: "43c.Curry Sauce gebacken Hähnchen", price: 15 },
  { name: "43d.Curry Sauce Ente", price: 17.2 },
  { name: "43e.Curry Sauce Garnelen", price: 17.5 },

  { name: "44a.Curry Xanh Tofu", price: 13.9 },
  { name: "44a.Curry Xanh Tofu Tempura", price: 14.5 },
  { name: "44b.Curry Xanh Rindfleisch", price: 15.5 },
  { name: "44c.Curry Xanh gegrillte Hähnchen", price: 15 },
  { name: "44c.Curry Xanh gebacken Hähnchen", price: 15 },
  { name: "44d.Curry Xanh Ente", price: 17.2 },
  { name: "44e.Curry Xanh Garnelen", price: 17.5 },

  { name: "45a.Teriyaki Tofu Tempura", price: 14.9 },
  { name: "45b.Teriyaki Rindfleisch", price: 15.5 },
  { name: "45c.Teriyaki gegrillte Hähnchen", price: 15 },
  { name: "45c.Teriyaki gebacken Hähnchen", price: 15 },
  { name: "45d.Teriyaki Ente", price: 17.2 },
  { name: "45e.Teriyaki Garnelen", price: 17.5 },
  { name: "45l.Teriyaki Lachs", price: 22.9 },

  { name: "46a.BBQ Tofu Tempura", price: 14.9 },
  { name: "46b.BBQ Rindfleisch", price: 15.5 },
  { name: "46c.BBQ gegrillte Hähnchen", price: 15 },
  { name: "46c.BBQ gebacken Hähnchen", price: 15 },
  { name: "46d.BBQ Ente", price: 17.2 },
  { name: "46e.BBQ Garnelen", price: 17.5 },
  { name: "46f.BBQ Lachs", price: 22.9 },


  { name: "50.Kappa Maki", price: 4.4 },
  { name: "51.Avocado Maki", price: 5.5 },
  { name: "52.Oshinko Maki", price: 4.4 },
  { name: "53.Tamago Maki", price: 4.5 },
  { name: "54.Tekka Maki", price: 5.7 },
  { name: "55.Ebi Maki", price: 5.7 },
  { name: "56.Unagi Maki", price: 5.9 },
  { name: "57.Sake Maki", price: 5.2 },
  { name: "58.Sake Avocado ", price: 5.8 },
  { name: "59.Kani Avocado ", price: 4.9 },





  { name: "60.Hot Sake Maki ", price: 5.5 },
  { name: "61.Hot Tuna Maki", price: 5.7 },
  { name: "62.Futo Roll", price: 9.5 },
  { name: "63.Rice Roll", price: 8.5 },
  { name: "64.Spicy Tuna Maki", price: 5.7 },
  { name: "65.Sake", price: 5.2 },
  { name: "66.Maguro", price: 5.5 },
  { name: "67.Ebi", price: 5.5 },

  { name: "68.Unagi", price: 5.5 },
  { name: "69.Tamago", price: 4.5 },
  { name: "70.Butterfisch", price: 4.9 },
  { name: "71.Inari", price: 4.5 },
  { name: "72.Sake nigiri Flambiert", price: 5.5 },
  { name: "73.Avocado ", price: 4.5 },
  { name: "74.Rice Nigiri", price: 6.2 },
  { name: "75.Spicy Sake", price: 5.2 },
  { name: "76.Spicy Tekka", price: 5.5 },


  { name: "80.Sake", price: 10.2 },
  { name: "81.Maguro", price: 10.9 },
  { name: "82.Tobiko", price: 10.2 },
  { name: "83.Philadelphia", price: 10.4 },
  { name: "84.Kani", price: 9.9 },
  { name: "85.Chicken Yakitori Roll ", price: 10.5 },
  { name: "86.Rice", price: 9.5 },
  { name: "87.Spicy Tuna Roll", price: 10.9 },
  { name: "88.Unagi", price: 10.9 },
  { name: "89.Hot Spicy Sake", price: 10.5 },
  { name: "90.Hot Spicy Tuna", price: 11.2 },


  { name: "91.Crunchy Chicken", price: 10.2 },
  { name: "92.Crunchy Lachs Roll", price: 10.5 },
  { name: "93.Crunchy Ebi", price: 10.5 },
  { name: "94.Crunhcy Tuna", price: 10.6 },
  { name: "95.Crunhcy Veggie", price: 9.5 },
  { name: "96.Crunhcy Sake Maki", price: 8.2 },
  { name: "97.Crunhcy Avocado Maki", price: 7.9 },
  { name: "98.Rice Crunhcy Spezialität", price: 11.5 },

  { name: "99.Salmon Special Roll", price: 13.7 },
  { name: "100.Tuna Special Roll", price: 13.9 },
  { name: "101.Lungs Roll", price: 13.9 },
  { name: "102.Inari Roll", price: 13.5 },
  { name: "103.Salmon Tempura Roll", price: 13.9 },
  { name: "104.Mix Roll", price: 14.4 },

  { name: "105.Tai Roll", price: 14.2 },
  { name: "106.Unagi Special Roll", price: 14.2 },
  { name: "107.Avocado Roll", price: 12.9 },
  { name: "108.Lachs Tempura Roll", price: 13.9 },
  { name: "109.Rice Special Roll", price: 16.5 },

  { name: "110.Sake Sashimi ", price: 11.2 },
  { name: "111.Tuna Sashimi", price: 12.2 },
  { name: "112.Mutsu Sashimi", price: 10.9 },
  { name: "113.Sashimi Mix", price: 23 },

  { name: "117.Tuna Menu", price: 22.5 },
  { name: "118.Crunchy Menu", price: 20.5 },
  { name: "119.Veggie Menu 1", price: 17 },
  { name: "120.Veggie Menu 2 ", price: 18 },
  { name: "121.Gambas Menu", price: 23 },
  { name: "122.Sake Menu", price: 29.5 },
  { name: "123.Rice Menu Hot", price: 25.5 },

  { name: "124.Rice Menu 1", price: 33.5 },
  { name: "125.Rice Menu 2", price: 31.5 },
  { name: "126.Rice Menu 3", price: 52.5 },

  { name: "127.Chicken Bowl ", price: 15.5 },
  { name: "128.Gyoza Bowl ", price: 14.5 },
  { name: "129.Green Bowl", price: 14.5 },
  { name: "130.Scampi Bowl", price: 16.5 },
  { name: "131.Lachs Sashimi Bowl", price: 16.5 },
  { name: "132.Tuna Sashimi Bowl", price: 17.5 },
  { name: "133.Ebi Tempura Bowl", price: 17.5 },
  { name: "134.Unagi Bowl", price: 17.5 },

  { name: "Mochi Eis Platte", price: 6 },
  { name: "Matcha Eis", price: 5.5 },
  { name: "Banh Chuoi Nep", price: 5.5 },
  { name: "Banh Khoai Mon", price: 5.5 },
  { name: "Panna Cotta", price: 5.5 },



  { name: "200.Lemon Ice Tea", price: 6 },
  { name: "201.Matcha Tea", price: 6 },
  { name: "202.Pfinrsich Ice Tea", price: 6.5 },
  { name: "203.Mango Smoothie", price: 6.9 },
  { name: "204.Limette Limonade", price: 6 },
  { name: "205.Maracuja Limonade", price: 6.9 },
  { name: "206.Swiss Love", price: 6.9 },
  { name: "207.Love Dream", price: 6.9 },
  { name: "208.Rice Limette Limonade", price: 6.9 },
  { name: "209.Orange Xi Muoi", price: 6.9 },
  { name: "210.Lovely Strawberry", price: 6.9 },

  { name: "214.Aperol Spritz", price: 7.5 },
  { name: "215.Mojito", price: 7.5 },
  { name: "216.Maitai", price: 7.9 },
  { name: "217.Rice Watermelon", price: 7.9 },
  { name: "218.Bailey Love", price: 7.5 },
  { name: "219.Pergola colour", price: 7.5 },
  { name: "220.Singapore Sling", price: 7.9 },
  { name: "221.Rice-Pina Colada", price: 7.9 },

  { name: "225.Blue Lagoon Mocktail", price: 6.9 },
  { name: "226.Früchte Bowie", price: 6.9 },
  { name: "227.Coco Shake", price: 7.5 },
  { name: "228.Pineappel mint Shake", price: 7.5 },

  { name: "230.Eis Kaffee", price: 3.9 },
  { name: "231.Eis Tee", price: 3.9 },


  { name: "233.Ingwer Tee", price: 4.2 },
  { name: "234.Minztee", price: 4.2 },
  { name: "337.Kamillentee", price: 3.9 },

  { name: "Ca Phe Vietnam", price: 4.2 },

  { name: "Flasche Wasser Still", price: 7.5 },
  { name: "Flasche Wasser mit ", price: 7.5 },

  { name: "Wasser Still", price: 4.3 },
  { name: "Mineralwasser", price: 4.3 },
  { name: "Coca Cola ", price: 4.3 },
  { name: "Cola Light ", price: 4.3 },
  { name: "Cola Zero ", price: 4.3 },
  { name: "Spezi ", price: 4.3 },
  { name: "Fanta ", price: 4.3 },
  { name: "Sprite ", price: 4.3 },
  { name: "Wasser Still", price: 2.9 },
  { name: "Mineralwasser", price: 2.9 },
  { name: "Coca Cola ", price: 2.9 },
  { name: "Cola Light ", price: 2.9 },
  { name: "Cola Zero ", price: 2.9 },
  { name: "Spezi ", price: 2.9 },
  { name: "Fanta ", price: 2.9 },
  { name: "Sprite ", price: 2.9 },
  { name: "Ginger Ale", price: 3.2 },
  { name: "Bitte Lemon", price: 3.2 },
  { name: "Tonic Wasser", price: 3.2 },

  { name: "Apfelschorle", price: 3.2 },
  { name: "Apfelschorle", price: 4.5 },
  { name: "Rhabarber", price: 3.2 },
  { name: "Rhabarber", price: 4.5 },
  { name: "Orangesaft", price: 3.2 },
  { name: "Apfelsaft", price: 3.2 },
  { name: "Annasaft", price: 3.2 },
  { name: "Bananasaft", price: 3.2 },
  { name: "Kirschsaft", price: 3.2 },
  { name: "Mangosaft", price: 3.2 },
  { name: "Maracujasaft", price: 3.2 },
  { name: "Guavensaft", price: 3.2 },
  { name: "Litschisaft", price: 3.2 },
  { name: "Kiba", price: 3.2 },
  { name: "Orangesaft", price: 4.5 },
  { name: "Apfelsaft", price: 4.5 },
  { name: "Annasaft", price: 4.5 },
  { name: "Bananasaft", price: 4.5 },
  { name: "Kirschsaft", price: 4.5 },
  { name: "Mangosaft", price: 4.5 },
  { name: "Maracujasaft", price: 4.5 },
  { name: "Guavensaft", price: 4.5 },
  { name: "Litschisaft", price: 4.5 },
  { name: "Kiba", price: 4.5 },
  { name: "Proviant Bio Ingwer und Zitron", price: 3.7 },
  { name: "Proviant Bio Rhabarber", price: 3.7 },
  { name: "Proviant Bio Maracuja", price: 3.7 },
  { name: "Proviant Bio Zitrone", price: 3.7 },
  { name: "Proviant Bio Orange", price: 3.7 },


  { name: "Bier Klein", price: 3.9 },
  { name: "Radler Klein ", price: 3.9 },
  { name: "Diesel Klein", price: 3.9 },
  { name: "Bier Groß", price: 5.2 },
  { name: "Radler Groß", price: 5.2 },
  { name: "Diesel Groß", price: 5.2 },

  { name: "Hefeweizen hell ", price: 4.9 },
  { name: "Hefeweizen Alkoholfrei", price: 4.9 },
  { name: "Bier Alkoholfrei", price: 3.5 },

  { name: "Chardonay ", price: 6 },
  { name: "Riesling ", price: 6 },
  { name: "Grauburgrunder ", price: 6.5 },
  { name: "Weishaar", price: 6.5 },
  { name: "Abricot Du Roussillon", price: 6 },
  { name: "Roter Bur Rot", price: 5.5 },
  { name: "Flasche Weishaar", price: 23.5 },
  { name: "Flasche Abricot Du Roussillon", price: 22 },
  { name: "Flasche Roter Bur Rot", price: 20.5 },
  { name: "Flasche Riesling", price: 22 },
  { name: "Flasche Chardonay", price: 22 },
  { name: "Flasche Grauburgrunder", price: 23 },
  { name: "Jasmin Tee", price: 4.2 },
  { name: "Grüntee", price: 4.2 },
  { name: "Bailey", price: 4.5 },
  { name: "Martini", price: 5.2 },
  { name: "Gin", price: 5.2 },
  { name: "Vodka", price: 4.5 },
  { name: "Rum", price: 4.5 },
  { name: "Tequila", price: 4.5 },
  { name: "Ginseng-Voldka", price: 5.2 },
  { name: "Bailey", price: 2.5 },
  { name: "Martini", price: 3.5 },
  { name: "Gin", price: 3.5 },
  { name: "Vodka", price: 3.2 },
  { name: "Rum", price: 3.2 },
  { name: "Tequila", price: 3.2 },
  { name: "Ginseng-Voldka", price: 3.5 },
];


const App = () => {



  // Read from localStorage and set the initial state for tables and orders
  const storedTables = JSON.parse(localStorage.getItem("tables")) || [
    ...Array.from({ length: 11 }, (_, i) => i + 1),         // 1 to 11
    ...Array.from({ length: 25 }, (_, i) => i + 14)          // 15 to 19
  ];
  let storedOrders = {};
  try {
    const raw = localStorage.getItem("orders");
    storedOrders = raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("Failed to parse orders from localStorage:", e);
    storedOrders = {};
  }

  const [tables, setTables] = useState(storedTables);
  const [orderItems, setOrderItems] = useState(storedOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTable, setCurrentTable] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [notes, setNotes] = useState([]); // State for notes
  // Retrieve orders from the backend 
  // 1. Fetch orders from backend when component mounts (page loads)
  useEffect(() => {
    const fetchOrders = () => {
      if (isModalOpen) return; // Don't fetch when modal is open

      fetch('https://rice-t904.onrender.com/api/orders')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            const ordersObject = {};
            data.forEach(({ table, orders }) => {
              ordersObject[table] = orders;
            });
            localStorage.setItem('orders', JSON.stringify(ordersObject));
            const newOrderItem = JSON.parse(localStorage.getItem("orders")) || {};
            setOrderItems(newOrderItem);
          }
        })
        .catch(err => {
          console.error('Error fetching orders:', err);
          const fallbackOrders = JSON.parse(localStorage.getItem("orders")) || {};
          setOrderItems(fallbackOrders);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const fetchNotes = () => {
      fetch('https://rice-t904.onrender.com/api/notes')
        .then(res => res.json())
        .then(data => {
          const notesObject = {};
          data.forEach(({ tableName, note }) => {
            notesObject[Number(tableName)] = note; // or String(tableName) if you prefer
          });
          localStorage.setItem("notes", JSON.stringify(notesObject));
          setNotes(notesObject);
        })
        .catch(err => {
          console.error('Error fetching notes:', err);
          const fallbackNotes = JSON.parse(localStorage.getItem("notes")) || [];
          setNotes(fallbackNotes);
        })
        .finally(() => {
          setLoading(false);
        });
    };// Fetch notes from backend
    fetchNotes(); // Initial fetch for notes
    fetchOrders(); // Initial fetch

    if (!isModalOpen) {
      const interval = setInterval(() => {
        fetchOrders();
        fetchNotes();
      }, 10000);

      return () => clearInterval(interval);
    }

  }, [isModalOpen]); // Re-run effect when modal opens/closes


  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch('https://rice-t904.onrender.com/health');
        if (res.ok) {
          const data = await res.json();
          if (data.db === 'connected') {
            setLoading(false);
          } else {
            setLoading(true);
          }
        } else {
          setLoading(true);
        }
      } catch (error) {
        setLoading(true);
      }
    };

    checkBackend(); // check immediately
    const interval = setInterval(checkBackend, 7000); // check every 5s

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="mt-15 ml-30 text-4xl text-center">Loading...</div>; // You can replace this with a spinner or fancy UI
  }







  // Add an "Abholung" table with a dynamic name (e.g., Abholung 1, Abholung 2

  // Handle clicking on a table to open the modal and reset order items
  const handleTableClick = (tableName) => {
    setCurrentTable(tableName);
    setIsModalOpen(true);
    setOrderItems(storedOrders[tableName] || []); // Load the saved order items for the selected table
  };

  // Add order item (dish) to the list
  const addOrderItem = (name, price) => {
    const newOrderItem = { name, price };
    const updatedOrderItems = [...orderItems, newOrderItem];
    setOrderItems(updatedOrderItems);

    // Save the updated order items to localStorage for the specific table
    const updatedOrders = { ...storedOrders, [currentTable]: updatedOrderItems };
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    /////////////////////
    // Prepare payload for backend
    console.log(updatedOrders);
    const payload = Object.entries(updatedOrders).map(([table, orders]) => ({
      table,
      orders
    }));
    console.log("Payload to sync:", payload);
    fetch('https://rice-t904.onrender.com/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => console.log("Synced to DB:", data))
      .catch(err => console.error("Error syncing orders:", err));
  };

  // Remove order item from the list
  const removeOrderItem = (index) => {
    const updatedOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedOrderItems);

    // Update the order in localStorage for the specific table
    const updatedOrders = { ...storedOrders, [currentTable]: updatedOrderItems };
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    /////////////////////
    // Prepare payload for backend
    console.log(updatedOrders);
    const payload = Object.entries(updatedOrders).map(([table, orders]) => ({
      table,
      orders
    }));

    fetch('https://rice-t904.onrender.com/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => console.log("Synced to DB:", data))
      .catch(err => console.error("Error syncing orders:", err));
  };
  const tablesWithOrders = Object.keys(storedOrders).filter(
    (table) => storedOrders[table] && storedOrders[table].length > 0
  ).map(Number); // convert to number if needed

  const totalSales = parseFloat(localStorage.getItem("totalSales")) || 0;

  const handleRefreshTwice = () => {
    // First reload
    window.location.reload();

  };
  return (
    <div className="w-full overflow-y-auto bg-white text-black flex flex-col items-center p-15">
      <h2 className="text-4xl text-yellow-300 font-bold mb-3 ">Rice-Restaurant</h2>
      <button onClick={handleRefreshTwice} style={{ fontSize: '24px', cursor: 'pointer', background: 'none', border: 'none' }}>
        <FiRotateCcw />
      </button>
      <div className="grid grid-cols-3 gap-4 w-full">
        {tables.map((table, index) => {
          const hasOrder = tablesWithOrders.includes(table);

          return (
            <div
              key={index}
              className={`cursor-pointer rounded-xl p-2 transition-colors ${hasOrder ? "bg-yellow-200 text-white" : "bg-white"
                }`}
              onClick={() => handleTableClick(table)}
            >
              <Table number={table} />
            </div>
          );
        })}
      </div>


      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tableName={currentTable}
        orderItems={orderItems}
        setOrderItems={setOrderItems}
        tables={tables}
        setTables={setTables}
        addOrderItem={addOrderItem}
        removeOrderItem={removeOrderItem}
        dishes={dishes}
      />
    </div>
  );
};

export default App;
