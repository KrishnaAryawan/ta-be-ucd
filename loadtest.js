import http from "k6/http";

export const options = {
	iterations: 1000000,
	vus: 100,
};

const BASE_URL = "http://localhost:3000";

const nameFirstRoom = ["King Size", "Individu", "Couple", "Keluarga"];
const nameSecondRoom = ["Lantai 1", "Lantai 2", "Lantai 3", "Lantai 4"];
const nameThirdRoom = ["Kecil", "Sedang", "Besar"];

const description = [
	"Ipsum consectetur ex ea laboris veniam. Fugiat quis aliqua aliqua qui id cupidatat aliqua culpa. Ut dolor consectetur proident aliquip ea sunt quis anim cillum esse.",
	"Quis incididunt dolore dolor ipsum qui elit tempor excepteur enim. Aute pariatur excepteur consequat eu ipsum in labore commodo enim nostrud quis exercitation nulla. Quis qui fugiat consequat voluptate velit do ipsum cupidatat sunt. Fugiat adipisicing minim commodo tempor Lorem esse velit dolore nisi nostrud culpa irure ad deserunt. Qui anim nisi qui voluptate velit sit. Magna eiusmod minim sunt labore minim ex ut sunt culpa dolor Lorem commodo amet. Ut est quis est officia.",
	"Tempor sint exercitation et quis consequat enim. Ad proident nulla qui labore culpa elit velit aliquip eu. Velit ut nulla aliquip enim aute qui et enim veniam anim.",
	"Amet sunt anim dolore cupidatat reprehenderit eiusmod laboris dolore cillum adipisicing et veniam dolor. Nulla est duis pariatur consectetur non do. Ea esse exercitation incididunt veniam elit laboris sunt eu deserunt magna eu.",
	"Aliqua aute nisi occaecat aliqua deserunt. Ad mollit deserunt adipisicing quis do est. Do quis culpa consequat et amet magna laborum officia esse ipsum ipsum qui nostrud.",
	"Eiusmod anim consectetur amet occaecat consequat mollit ipsum sint exercitation eu. Est duis mollit eiusmod Lorem Lorem culpa ad ad. Proident velit velit excepteur qui reprehenderit nostrud et occaecat. Dolor tempor magna do sunt quis minim culpa officia et.",
	"Ullamco nulla aliquip magna excepteur nulla laboris ut dolore laboris ad qui reprehenderit. Eu magna sunt sint enim labore. Ea ullamco proident ea anim quis eiusmod culpa officia elit.",
	"Aliquip veniam Lorem occaecat sunt laboris pariatur duis id dolor amet esse reprehenderit. Anim mollit aute occaecat ex. Minim aute ullamco fugiat incididunt fugiat est. Eiusmod voluptate cillum laborum incididunt laborum pariatur irure ut do adipisicing quis.",
	"Fugiat ut do nisi ad elit anim ex enim nisi. Cupidatat pariatur eu est non deserunt deserunt magna ex exercitation labore nulla et duis sint. Cupidatat aliquip amet aute enim dolor consectetur deserunt ea consequat aute irure sunt consectetur aliqua. Minim est officia esse excepteur incididunt elit deserunt deserunt minim eu esse.",
];

const pricePerDayPool = [20000, 50000, 100000, 124000, 413000, 39999, 45999];

const imageUrlPool = [
	"https://img1.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg",
	"https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Hotel-room-renaissance-columbus-ohio.jpg/1024px-Hotel-room-renaissance-columbus-ohio.jpg",
	"https://media.cntraveler.com/photos/56799015c2ebbef23e7d927b/4:3/w_935,h_701,c_limit/Hotelroom-Alamy.jpg",
	"https://id.marinabaysands.com/content/dam/revamp/hotel/rooms-suites/deluxe-room/masthead-600x660.jpg",
	"https://www.seleqtionshotels.com/content/dam/seleqtions/Connaugth/TCPD_PremiumBedroom4_1235.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg",
	"https://www.carltoncity.sg/sites/carltoncity/files/styles/overview_page_img/public/2017-11/deluxe.jpg?itok=6LwucTDk",
	"https://ik.imagekit.io/tvlk/blog/2020/04/Hotel-Room-Types_2.jpg?tr=dpr-2,w-675",
];

const pickRandom = (pool) => {
	const max = pool.length - 1,
		min = 0;
	const i = Math.floor(Math.random() * (max - min + 1)) + min;
	return pool[i];
};

export default () => {
	http.post(
		`${BASE_URL}/room`,
		JSON.stringify({
			name:
				pickRandom(nameFirstRoom) +
				" " +
				pickRandom(nameSecondRoom) +
				" " +
				pickRandom(nameThirdRoom),
			description: pickRandom(description),
			pricePerDay: pickRandom(pricePerDayPool),
			imageUrl: pickRandom(imageUrlPool),
		}),
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
};
