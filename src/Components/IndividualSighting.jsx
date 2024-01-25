import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "./constants";
import { Form } from "react-bootstrap";

function IndividualSighting(props) {
	let { sightings } = props;

	let { sightingIndex } = useParams();
	const [individualSightingData, setIndividualSightingData] = useState({});
	const [commentList, setCommentList] = useState([]);
	const [newComment, setNewComment] = useState("")
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/sightings/${sightingIndex}`)
			.then((res) => {
				console.log(res.data);
				setIndividualSightingData(res.data);
				getComments();
			})
			.catch((err) => console.log(err));
	}, [sightingIndex]);

	const getComments = () => {
		axios
			.get(`${BACKEND_URL}/sightings/comment/${sightingIndex}/`)
			.then((res) => {
				console.log(res.data);
				setCommentList(res.data);
			})
			.catch((err) => console.log(err));
	};

	const submitComment = () => {
		axios
			.post(`${BACKEND_URL}/sightings/comment/${sightingIndex}/`,{
				content: newComment
			})
			.then((res) => {
				console.log(res);
				getComments()
			}).catch(err=>console.log(err))
	};

	let { date, location, notes } = individualSightingData;

	return (
		<>
			<button onClick={() => navigate(`/`)}>Home</button>
			<h1>{location}</h1>
			<br />
			<h2>{date}</h2>
			<hr />
			<h3 className="report__content-header">Report:</h3>
			<p className="observed">{notes}</p>
			<div className="container__btn-nav">
				{sightingIndex == 0 ? null : (
					<button
						onClick={() => navigate(`/sightings/${Number(sightingIndex) - 1}`)}
					>
						previous
					</button>
				)}
				{sightingIndex == sightings.length - 1 ? null : (
					<button
						onClick={() => navigate(`/sightings/${Number(sightingIndex) + 1}`)}
					>
						next
					</button>
				)}
			</div>
			<ul>
				{commentList.map((comment) => (
					<li key={comment.id}>{comment.content}</li>
				))}
			</ul>
			<Form>
				<Form.Group className="mb-3" >
					<Form.Control type="text" onChange={(e)=>setNewComment(e.target.value)} placeholder="add comment" />
				</Form.Group>

				<button onClick={() => submitComment()}>Submit</button>
			</Form>
		</>
	);
}

export default IndividualSighting;
