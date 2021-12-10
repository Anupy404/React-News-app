import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
	static defaultProps = {
		country: "us",
		pageSize: 5,
		category: "general",
		apiKey: "4bd783ed9c7b43a5a044b351926d65b7",
	};
	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
		category: PropTypes.string,
		apiKey: PropTypes.string,
	};

	constructor() {
		super();
		//console.log(" Hello I am a constructor from news component");
		this.state = {
			articles: [],
			loading: false,
			page: 1,
		};
	}

	async componentDidMount() {
		//	console.log("cdm");

		let url = `https://newsapi.org/v2/top-headlines?apiKey=${this.props.apiKey}&category=${this.props.category}&country=${this.props.country}&pageSize=${this.props.pageSize}`;
		this.setState({
			loading: true,
		});
		let data = await fetch(url);
		let parsedData = await data.json();
		console.log(parsedData);
		this.setState({
			articles: parsedData.articles,
			totalResults: parsedData.totalResults,
			loading: false,
		});
	}

	handleNextClick = async () => {
		if (
			!(
				this.state.page + 1 >
				Math.ceil(this.state.totalResults / this.props.pageSize)
			)
		) {
			console.log("You have clicked on Next");

			let url = `https://newsapi.org/v2/top-headlines?apiKey=${
				this.props.apiKey
			}&country=${this.props.country}&category=${this.props.category}&page=${
				this.state.page + 1
			}&pageSize=${this.props.pageSize}`;
			this.setState({
				loading: true,
			});
			let data = await fetch(url);
			let parsedData = await data.json();
			console.log(parsedData);

			this.setState({
				page: this.state.page + 1,
				articles: parsedData.articles,
				loading: false,
			});
		}
	};

	handlePrevClick = async () => {
		console.log("You have clicked on Previous");

		let url = `https://newsapi.org/v2/top-headlines?apiKey=${
			this.props.apiKey
		}&country=${this.props.country}&category=${this.props.category}&page=${
			this.state.page - 1
		}&pageSize=${this.props.pageSize}`;
		let data = await fetch(url);
		let parsedData = await data.json();
		console.log(parsedData);
		this.setState({
			page: this.state.page - 1,
			articles: parsedData.articles,
		});
	};

	render() {
		//console.log("render");
		return (
			<div className="container my-2">
				<h1 className="text-center" style={{ margin: "40px 0px" }}>
					Newzy World - Top Headlines
				</h1>

				{this.state.loading && <Spinner />}
				<div className="row my-2">
					{!this.state.loading &&
						this.state.articles.map((element) => {
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
				<div className="container d-flex justify-content-between">
					<button
						type="button"
						className="btn btn-warning"
						disabled={this.state.page <= 1}
						onClick={this.handlePrevClick}
					>
						&larr; Previous
					</button>
					<button
						type="button"
						className="btn btn-info"
						onClick={this.handleNextClick}
						disabled={
							this.state.page + 1 >
							Math.ceil(this.state.totalResults / this.props.pageSize)
						}
					>
						Next&rarr;
					</button>
				</div>
			</div>
		);
	}
}

export default News;
