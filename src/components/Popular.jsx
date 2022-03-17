import { useEffect, useState } from "react";
import styled from "styled-components";
//Splide, splide styling Carousel
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

const Popular = () => {
	//Run the getPopular function as soon as this component gets mounted
	//The array, only run it when it gets mounted
	useEffect(() => {
		getPopular();
	}, []);

	const [popular, setPopular] = useState([]);

	//Data we need to wait for before render everything out
	const getPopular = async () => {
		//Cache data so we don't have to fetch every request
		const check = localStorage.getItem("popular");
		if (check) {
			setPopular(JSON.parse(check));
		} else {
			const api = await fetch(
				`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
			);
			const data = await api.json();
			localStorage.setItem(
				"popular",
				JSON.stringify(data.recipes)
			);
			setPopular(data.recipes);
		}

		const api = await fetch(
			`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
		);
		// Make it into json format so we can access the data easily
		const data = await api.json();
		setPopular(data.recipes);
	};
	return (
		<div>
			<Wrapper>
				<h3>Popular Picks</h3>
				<Splide
					options={{
						perPage: 4,
						type: "loop",
						autoScroll: {
							speed: 3,
						},
						autoStart: true,
						pauseOnHover: true,
						autoplay: true,
						arrows: false,
						pagination: false,
						drag: "free",
						gap: "5rem",
						breakpoints: {
							1024: {
								perPage: 3,
							},
							820: {
								perPage: 2,
							},
							640: {
								perPage: 1,
							},
						},
					}}
				>
					{popular.map((recipe) => {
						return (
							<SplideSlide key={recipe.id}>
								<Card>
									<Link to={"/recipe/" + recipe.id}>
										<p>{recipe.title}</p>
										<img
											src={recipe.image}
											alt={recipe.title}
										/>
										<Gradient />
									</Link>
								</Card>
							</SplideSlide>
						);
					})}
				</Splide>
			</Wrapper>
		</div>
	);
};

const Wrapper = styled.div`
	margin: 4rem 0rem;
`;

const Card = styled.div`
	min-height: 25rem;
	border-radius: 2rem;
	overflow: hidden;
	position: relative;

	img {
		border-radius: 2rem;
		position: absolute;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	p {
		position: absolute;
		z-index: 10;
		left: 50%;
		bottom: 0%;
		transform: translate(-50%, 0%);
		width: 100%;
		color: white;
		text-align: center;
		font-weight: 600;
		font-size: 1rem;
		height: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const Gradient = styled.div`
	z-index: 3;
	position: absolute;
	width: 100%;
	height: 100%;
	background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
