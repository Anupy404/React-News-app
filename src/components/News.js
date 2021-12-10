import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalResults, setTotalResults] = useState(0);

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
	document.title = `${capitalizeFirstLetter(props.category)} -Newzy World`;

	const updateNews = async () => {
		props.setProgress(10);
		const url = `https://newsapi.org/v2/top-headlines?apiKey=${props.apiKey}&category=${props.category}&country=${props.country}&page=${page}&pageSize=${props.pageSize}`;
		setLoading(true);
		let data = await fetch(url);
		props.setProgress(40);
		const parsedData = await data.json();
		props.setProgress(70);
		//console.log(parsedData);
		setArticles(parsedData.articles);
		setTotalResults(parsedData.totalResults);
		setLoading(false);

		props.setProgress(100);
	};
	useEffect(() => {
		updateNews();
		// eslint-disable-next-line
	}, []);

	const fetchMoreData = async () => {
		const url = `https://newsapi.org/v2/top-headlines?apiKey=${
			props.apiKey
		}&category=${props.category}&country=${props.country}&page=${
			page + 1
		}&pageSize=${props.pageSize}`;
		setPage(page + 1);
		let data = await fetch(url);
		const parsedData = await data.json();
		//console.log(parsedData);
		setTimeout(() => {
			setArticles(articles.concat(parsedData.articles));
			setTotalResults(parsedData.totalResults);
		}, 500);
	};

	return (
		<>
			<h1 className="text-center" style={{ margin: "80px 0px" }}>
				Newzy World - Top {capitalizeFirstLetter(props.category)}
				Headlines
			</h1>
			<InfiniteScroll
				dataLength={articles.length}
				next={fetchMoreData}
				hasMore={articles.length !== totalResults}
				loader={<Spinner />}
			>
				{loading && <Spinner />}

				<div className="container">
					<div className="row my-2">
						{articles.map((element) => {
							//console.log(element);
							return (
								<div className="col-md-4" key={element.url}>
									<NewsItem
										title={element.title ? element.title.slice(0, 70) : ""}
										description={
											element.description
												? element.description.slice(0, 150)
												: ""
										}
										imageUrl={element.urlToImage}
										author={element.author ? element.author : "unknown"}
										date={element.publishedAt}
										newsUrl={element.url}
										source={element.source.name}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</InfiniteScroll>
		</>
	);
};
News.defaultProps = {
	country: "us",
	pageSize: 5,
	category: "general",
	apiKey: process.env.REACT_APP_NEWS_API,
};
News.propTypes = {
	country: PropTypes.string,
	pageSize: PropTypes.number,
	category: PropTypes.string,
	apiKey: PropTypes.string,
};

export default News;
