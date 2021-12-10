import React from "react";

const NewsItem = (props) => {
	let { title, description, imageUrl, newsUrl, author, date, source } = props;
	return (
		<div>
			<div className="card my-2">
				<span
					className="badge rounded-pill bg-danger position-absolute top-0 end-0"
					style={{ width: "130px" }}
				>
					{source}
				</span>
				<img
					src={
						imageUrl
							? imageUrl
							: "https://www.bollyinside.com/wp-content/uploads/2021/10/Amazon-wants-to-turn-your-cell-phone-into-a-satellite.png"
					}
					className="card-img-top"
					alt="..."
				/>
				<div className="card-body">
					<h5 className="card-title">{title} ...</h5>
					<p className="card-text">{description} ...</p>
					<p className="card-text">
						<b className="text-muted">
							By {author} on {new Date(date).toGMTString()}
						</b>
					</p>
					<a
						href={newsUrl}
						className="btn btn-dark btn-sm"
						target="_blank"
						rel="noreferrer noopener"
					>
						Read More
					</a>
				</div>
			</div>
		</div>
	);
};

export default NewsItem;
