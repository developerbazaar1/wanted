import NextButton from "../components/NextButton";
import { Link } from "react-router-dom";

const All = () => {
  const All = [
    {
      PosteImage:
        "https://s3-alpha-sig.figma.com/img/971c/7c63/cc1d3d96b5da02f95d17e14d05a57d30?Expires=1698624000&Signature=AUrQpobQCzgUDJgu4QXOmCaatwkuOJAigVKLBAun6iaKeE7dEx~C9y0YuK6c-Se6xe~jzZ6dgNq6lw7TnErCssOZlr2nvRacBADYGMiyDpll33timcenQoF-b9xg~5nbp~9P-KLv3PKciKHPhWRaOrWaU3b5FqMDoLAlo972egd8x8O~OblXFX6Sa~SSRVNla8UvODwaiY9C7BhE~T2HFedsVV7DH6U1-TvG5QiFfkGd~du75-bm3T2-U20A5CLJzXjkWZ6pzuywhFXMaONlcDQI1ueohWr5YJeZdzC8-pT4Qe2ErCKZgHzUmqSqotddFGQKNt1tcCysHyqE7~rd3A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      Cat: "Beauty & Spa / Salon",
      Description: "Up to 37% Off on Nail SpaSalon - Shellac  No-Chip  Gel",
      Provider: "Reybella Nails",
      Price: "£39.99",
      OffPrice: "£86",
      Id: "1",
      label: "Service",
    },
    {
      PosteImage:
        "https://s3-alpha-sig.figma.com/img/ba7f/6bb4/2b6c63194a4300bbf217b06e2590f378?Expires=1698624000&Signature=DfwmbdIf68~nXPqbScizhcuIB56dTq~mnuU112VJzXcfDaRdIYAS95HbHfmzAsdAULlaxLM01rRR-SDBbaz4nEULdQxEfI5XPlg4mQgXh4GMi1wcEE8dOG~v3nemDd7Iuw~odfnaTbjdZjdGix83ca0GX9sEHtimv8ai9cN9vCVTGXFHw5YmKWeaKqZv2V7Hxmw4FV~nRN~HbNsAkPaZzFSz2sP16BnDylEtP67~1zE5odqP4d1wgmG1pNbt7XDCR0aG3OBlBLvKv7cvrSpXdpx9lGK9Vpusubf1Bv8Sa9JJVWX~smRGMrTuSOPeMtQuk14Qt7ZRbtwJ2ASeHv3Wew__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      Cat: "Food & Beverages / Breweries & Wineries",
      Description: "$40 for $50 Gift Card to Buffalo Creek Brewing ($50 Value)",
      Provider: "Buffalo Creek Brewing",
      Price: "£39.99",
      OffPrice: "£86",
      Id: "2",
      label: "Live Ads",
    },
    {
      PosteImage:
        "https://s3-alpha-sig.figma.com/img/971c/7c63/cc1d3d96b5da02f95d17e14d05a57d30?Expires=1698624000&Signature=AUrQpobQCzgUDJgu4QXOmCaatwkuOJAigVKLBAun6iaKeE7dEx~C9y0YuK6c-Se6xe~jzZ6dgNq6lw7TnErCssOZlr2nvRacBADYGMiyDpll33timcenQoF-b9xg~5nbp~9P-KLv3PKciKHPhWRaOrWaU3b5FqMDoLAlo972egd8x8O~OblXFX6Sa~SSRVNla8UvODwaiY9C7BhE~T2HFedsVV7DH6U1-TvG5QiFfkGd~du75-bm3T2-U20A5CLJzXjkWZ6pzuywhFXMaONlcDQI1ueohWr5YJeZdzC8-pT4Qe2ErCKZgHzUmqSqotddFGQKNt1tcCysHyqE7~rd3A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      Cat: "Health & Fitness / Sports",
      Description:
        "10 Kickboxing Classes or One Month of Unlimited Kickboxing (Up to 61% Off)",
      Provider: "Mind Body Defense",
      Price: "£39.99",
      OffPrice: "£86",
      Id: "3",
      label: "Service",
    },
  ];
  return (
    <div className="container_live">
      {All?.map((offer) => (
        <Link to="/details" className="single_Ads p-0" key={offer.Id}>
          <div>
            <div className="ads_img_div">
              <img src={`${offer.PosteImage}`} alt="faceAndSkin" />
              <div className="favoruite">
                <svg
                  viewBox="0 0 24 24"
                  className="unfilled"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                </svg>
              </div>
            </div>
            <div className="ads_details">
              <button className="ads_label">{offer.label}</button>
              <p>{offer.Description}</p>
              <div className="provider">{offer.Provider}</div>
              <div>
                <span className="price">{offer.Price}</span>
                <span className="off_price">{offer.OffPrice}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}

      <NextButton />
    </div>
  );
};

export default All;
