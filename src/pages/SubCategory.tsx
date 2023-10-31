import { Link, useParams } from "react-router-dom";
import "../css/subCategory.css";

const SubCategory = () => {
  const { subcategory } = useParams();
  console.log(subcategory);

  const food = [
    {
      img: "https://s3-alpha-sig.figma.com/img/68c0/3a4f/45de69b2a8cf4032fe56a8f7d24c9443?Expires=1698624000&Signature=KGCXQbi1iVWSx944OCJIGClwA8dwAosWnGho~ZDCmHHbG94afqjA~drI2TMAv69vknaB~6DV6g-5iElMHuanFdKgkOeqXLlPlJybwKQK3PjVwPHpfIF9CXav-cqEM0kynzwbAoN7Ni2yYylslTWM2OxtwYE03JxH7k2aAeM6nWajb7DjFtMmY3gmLm4NA903tP4uqJX2fhf-wUNxgs~iS4B6mmRWBGRw8V8P7o9ez6ymuTs3AjxHusqwld~~5EaWNeI0T7A-nPKhCixSbDyXu84oWZbv-tcRtx0RDm4OuiqdpVlF3aKVD1rYO2Z38C~HCxecyTi3DkxuMQNPY3wAqg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: "Restaurants",
      id: "2",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/114d/5221/035bf5ac8601575469b5079353d89483?Expires=1698624000&Signature=RmUaGeFjHx6H1UhaBpZtiAbs-fjUrp58sYo6vENiqbl0CmoiHKwdzyBeGKrAN1RAzYytmw2JOaXq0G9SsU7Y-IlSaklw3Y6WNYGUn~rla7cg21rSamtveyHvYpTWJFkqRX-gaH5BBbajsnSakeZ5khDJMQiF61XdMw4esazWBaAhgbynT~oLj9hFCRtsPO61j8e1VbP-aO6KjBiUmTLNZ-cygSsqyKKvrxRMF~4mRHY7ouquXzL59rRWry9L3ufbxUnif753Ajhy22BKFMwAHNiuY4uEjWwMOJAt2sKnfwrGoWcK97ODk~OhkPWhY75wQaxQK6cbROIAjY0yLLyc3Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: "Cafe & Treats",
      id: "3",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/e135/c88d/10ce2d5697bbc4d06b861c288a55c905?Expires=1698624000&Signature=dX4u~Nf88rFHtaomoaTOHRn96n6ySb0E6FneJXRcdIO6GudBR99FxfpytYr1lg8tVWwhEgMx1nzx~GKkTaYoiOYexw2poTAs2I51U0vHUvJCV775FH-aOYDn3uIb5SjYml~BIl5LtSVbk~KKjnxj9Li1gDOBZpjhp~EfJ8iHSf3fVj7m0JpAQa5sVcxnJmnGzEQ0ksL~8CYDaXINmUrHPROuk9jnjbGIEzwQQxiRHijOBpd4F~X3rg3YSk8Ng--CE4j8yrI08-G~rlTY5s7HgA5aI~PEh5C62geNSBhfGS~IjKB5mwsMTa~Lt-bDU04hxHwTqxieyjzA4edZMOk8Bg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: "Breweries, Wineries ",
      id: "4",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/e135/c88d/10ce2d5697bbc4d06b861c288a55c905?Expires=1698624000&Signature=dX4u~Nf88rFHtaomoaTOHRn96n6ySb0E6FneJXRcdIO6GudBR99FxfpytYr1lg8tVWwhEgMx1nzx~GKkTaYoiOYexw2poTAs2I51U0vHUvJCV775FH-aOYDn3uIb5SjYml~BIl5LtSVbk~KKjnxj9Li1gDOBZpjhp~EfJ8iHSf3fVj7m0JpAQa5sVcxnJmnGzEQ0ksL~8CYDaXINmUrHPROuk9jnjbGIEzwQQxiRHijOBpd4F~X3rg3YSk8Ng--CE4j8yrI08-G~rlTY5s7HgA5aI~PEh5C62geNSBhfGS~IjKB5mwsMTa~Lt-bDU04hxHwTqxieyjzA4edZMOk8Bg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: "Groceries & Markets",
      id: "5",
    },
  ];

  const beautSpa = [
    {
      img: "https://s3-alpha-sig.figma.com/img/8ffe/ab63/f7ed0eae0589ce94d4b6954dc22c06f9?Expires=1698624000&Signature=CsXlEIa1W4~ViH~anCbG6~te8UDyJf-uB-X0y-OI0H9t4MqJWJHSxDGN94G-YwKZm0ARLck-4sp6vvGZUn5OKeGe6EcgBgwvHJ9SEjhgLkpXtUgEhpr9QQ1h2GltCHlwqX682X0PHtkx66kqCt58dTlVO0JbarVs9y73x969SV-ERNcPcvazGbHfeCEyq8Fb3mW77OjGICTt2LilbQWEJLjzruf4wkMUufxXZQR1TYKMkVN0JXhPFxlfhouvTeDcKXtDNIgfhCaB9qjtJbD~15nk62F4OeuSLUJl1nBB~NFOz7PiBGaM723yBEy1POM6X9oG2HU~aITcwr0GEV9AoA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: "Face & Skin",
      id: "2",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/e788/3471/3633d900214d4ef51530e9aa5a60e6ef?Expires=1698624000&Signature=diXPNuTAnFxgGmHdp2uX-h61ID7locYT2f1p8etxldyVSUlCtJBaUgUiH2ErfYW~iO17MXoKfF2aHtSdOBN8XAtuInLD8LHYpHA5Ban0S4BcozfPWhCAEYDrfqvWjCdpVtKBXULHgOAakiSsfaezXzKE7CWf~SQOor6wULGCMhaGaDKSZYHFSIaaKKSFQlFFNKlZHPQgrYfb0onUyXhj-HPMmmdNTXq~2IQJmBQkj5JIGDwkUDUUBVh-qKVE9IuQsmy07~Cogyh3jeWAhr0DHDP64jsheSAJhji0tvyUhqtRPvgnjzgCXL8gr6pcknTOoLEZ4HNAcNK2S-TvH71~dA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: "Salon",
      id: "3",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/0dd5/0a76/9fda19138c59f5d2a12366da02b07057?Expires=1698624000&Signature=VjhN3ihyuEN-OCiNpnZlpHwSgCh8yM83AqZFl9LdVZMmbCC5biD0JhkF53B2R7ACt7ux4dnrAnHNWDy07IDJI-BmTOL0v0~lWPtDUWXbCW8IZxkpu2ZB4Y5JXEq8DLtcoJm~2eU-SQK~H5Mp8VRCxlI2RDRtES3SsoU-7x5ft9ASKzZV8gZX3Hg1r5jzo3zDrHRjr~QTRHf4ZMMnmQtwuYmnXCo8sSeeh8E92hA-E80ey8XopEn5c64~93pNSLJHvvEs4qDvn--rNmwpwcWiuFiD7ojc5yAWzeegTV73bhZImr1CoenbLaJ77eaQmvcIF1X41hI1V0MS581UHcm8Ng__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: "Massage",
      id: "4",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/07e7/087c/890a1c6239bb2605f6b42f5d08caa1f3?Expires=1698624000&Signature=URADt0yH0PcHFe-3u3-TFBeU9K6F1lhQGVblVmHg3s1rLQgYS6jGrTuPETDgMzN77aF92C3~Idc6sv7L4cLpbL6pRZ0HD31l1kKL4HkwCb15c2SNawLLG1TUeqcf9Q2rQoolMo5i4PSVz7kJA270wMqmZ9iRxpGbVJmpaxhkGy2YLicJe0kP7~oRu8D2Vif0SNQq2qF3gYBsPX16ZfcSou8bicLMECx~Kxn8L66m~9wUtsIyFC1SSXmPgGR1mSlDwwlvbfYzqEmYu~KPpeRJJ70sbOQAGO5~rGooiaWqYCXWgXrYYtm0dAJ68kfWWY-NYgcwM1px~B1hsftApoC0yw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: "Brow & Lashes",
      id: "5",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/5d94/ba46/3c953127f14ebe70be5eae5dc3029da8?Expires=1698624000&Signature=lBOyC5-NFHi8adwBfRabNZDMOs4uxZsOKl5OUhPPUYTYEHVfewk~HSYyL6cNCJ5UTNtdGIWhoN20Pp7MUBIMZEcxGXJyAUN2FS4ctRUs1HA1vxdG5wAQYilHaBjNov7la6DzxwdRNJIwPNDj4bFlQd8vUOpamTSnKy861A9-eBiDeu7sz9E8hzDbnGmUoLo4oR-yWW57Cw-9XQLi7HQPgHGdmInu3q8akzXlji2f7GL9NITHI-ujhluxYlE~jb8PKQ3hBhhomUFcqOVLcAsLws3fS~ePpwgYIrV4NFwQiMLklMFIPhyEYU~M7U3bMuaTfTXptC5d8On25numG5CxaQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: "Hairs & Styling",
      id: "6",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/cfc3/540b/e0ff15aa46ee07c1314fe6bcadbd3317?Expires=1698624000&Signature=EBqcDKyk-cKfj4hrpG405w8x9vWk9X8wRoDG32j0-RARIpycTxV~B9N5mfloBwndNFfyF65osr3v4xsqC0quBUa~6PfXDVNwE18nJjOyvQ-8ii4oKxzD6bxADPSg~ckzxxAEDGzK71Haz3C2O4a0-h8yOzzsxT1HxK-ZqfLgfXYSA-c4IxIuLII8mexS88aO-K9x1eaKRPEZrNwK1FIKoEwNa5lKD5hGsMH7Y4AGRNMkp~H2R2NYev8-9USyy8KBb5s31YulJhgUH0honP4LCcCuuJXUcL~CrdTDBmVJtrPRx4j9fkNw8uGWpIQEuuP~5TAQo7QiYr6LF6H~5GCk5Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: "Hair Removal",
      id: "7",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/0edd/d30a/13c022ca5d20cf94204719603eea931c?Expires=1698624000&Signature=BFUa6CLuIlP-tSUrYFs~MIWbI-tbbpGjBXc9XRmWLosJ8AcXUJ7acV48I3uAOc4ULZlrgnfYWscvzyvqkgp0Pet1MI-vCJNJtPRlQGvaX0ysxEGTt~CL51AbtC74hNqTi28EqFiph5ibqkmVz0EET25zs5WXiWFntiruzJ2qaFcPWHkPz3STBh3ehaF9p8tlbuaDAJ2w1DOWRIqV2cjMWxJPuMwVwW-njOnqCMPhIaN82z8RVBoFKcvjQ~bk3yVAYRckX8kS1YFn~aoySghn6roLisZWVba5Uei9OvWwzArjieg0heKuFpIhmrd-6sBZm4ip2J844a0QTqzIK2rprQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: "Makeup",
      id: "8",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/451f/98b9/7e405efd741c617427e7c472054ed0cb?Expires=1698624000&Signature=HvLSTRe1nE9ZrgoppiVskyXVqcD4QlTs6xcf8~WEGgaZ76trQVfRF9cJfT88HcLEYYMc4YOFlykDYP-Q4JIA2djHj23pBpr644GkxgymU-3ju9hHtiC9KFIle0Z4EYQ9D1tzU4qgFqXHIYEEQHkJ9sm9P~RCn3g6-fL-Qn~439unDUkWkz-~jx1~8GlO6fw-IBBz4oKH1zgmBLzfXybx81P1TezEfNb9tQOo6RaCkzU-~5xYyDUtqxJJ362qA52E5sc11mWADuwSe6y02SCvm7agIfPO47ureGDz02VWwLn-clLd271~VjG-rmY3pvcAj4G9Yk03cCObe6c44184og__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: "Spa",
      id: "9",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/230a/da10/971c211f8963fac0d411d4357ae5e4d5?Expires=1698624000&Signature=c4hT9DxZ6SBfk8T6HUyXCKC9DpIGZQzPcqt8fLWJSnFClxELlblDZNoLXv8RVm8M7rNMeMl5hEoEOCckSlbeoDa7EXMU94wjmwIM8yN~ZXL8OfMYGmHUs90MLTARVMBIot2GQ4eFcWs~9Tu6IT3OfVAOWxnJm4sGCvJXBYR2eeUFQF594-P22GDLSwYGIm8bE1IIKRtlvvnXJIIj0SU7Wy4wL91afpuCWUukrHkMgNu74o3Kspvz3XiS7N0yA~ggO7-heYqQ6aSA93QXbViv25CK64E8~d6OP7dIJkUthEriTTco07o9b6aLVovrW4leXxKXpIBHp3evkGLrKSYpoQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      name: "Tanning",
      id: "10",
    },
  ];

  const subCat = subcategory === "food" ? food : beautSpa;

  return (
    <>
      <div className=" single_cat_name_heading">
        <div>
          <div className="cat_icon_img_div">
            <img
              src="https://s3-alpha-sig.figma.com/img/ee9b/ec33/02b10540403e7971c2e86de6a6403864?Expires=1698624000&Signature=gSYwOyw~wfuvw69mXdoeM2d407pcO3dVBngIW-cC6qVqwf1MMd4odo~0XXa6tBvQiwy3OMtmJX96VvamKCxiNPibYUp8DAihV2lQgbOqLSOAlBFDv9De7V-v0ZC9ABIYJza1DFHa~mZjqKBbkG7CIIDPHOxNF3OzUjbt90y0eNCfKYmAsf6yTu5d6zT~4p2bNgfIDc2aWCaCbptqOcMoGbLWAlJDDaZBzQKlxjoOUV8gxh88ILBmAH9K03Ha7V9AfCNgMjaHh6pw6t0FPcliVm9cCA-nIPcW8yIgptGl9ryEM2ZoEwXh6oL7Wm6baO92rZF7F2MFgggyrN8totjboQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt="BeautySpa"
            />
          </div>
          <h2>{subcategory === "food" ? "Food & Beverage" : "Beauty & Spa"}</h2>
        </div>
      </div>
      <div className="subCategory_container">
        {subCat.map((subcat) => (
          <div className="single_Subcat p-0" key={subcat.id}>
            <Link to={`${subcategory === "food" ? "/Foodbeverage" : "beauty"}`}>
              <div className="single_cat_content">
                <div className="single_subCat_img">
                  <img src={subcat.img} alt="loadiing" />
                </div>
                <div className="single_sub_cat_name">
                  <h2>{subcat.name}</h2>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default SubCategory;
