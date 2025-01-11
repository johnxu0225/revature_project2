import { EnvelopeListCard } from './EnvelopeListCard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from "react-router-dom";

interface History {
	amount_history_id: number,
	envelope_id: number,
	transaction_id: number,
	envelope_amount: number
}

interface Envelope {
	envelope_id: number,
	user_id: number,
	envelope_description: string,
	balance: number,
	max_limit: number,
	envelope_history: History[],
}

export const EnvelopeList: React.FC = () => {

	let envelopes: Envelope[] = [];

	const navigate = useNavigate();

	// Examples for paid, nearly used, over budget envelopes
	for (let i = 0; i < 10; i++) {
		envelopes.push({
			envelope_id: i,
			user_id: 1,
			envelope_description: "asdf",
			balance: 999,
			max_limit: 999,
			envelope_history: [
				{amount_history_id: i, envelope_id: i, transaction_id: i, envelope_amount: 69},
				{amount_history_id: i, envelope_id: i, transaction_id: i, envelope_amount: 69},
				{amount_history_id: i, envelope_id: i, transaction_id: i, envelope_amount: 69}
			]
		});
	}

	for (let i = 10; i < 15; i++) {
		envelopes.push({
			envelope_id: i,
			user_id: 1,
			envelope_description: "asdf",
			balance: 499,
			max_limit: 999,
			envelope_history: [
				{amount_history_id: i, envelope_id: i, transaction_id: i, envelope_amount: 69},
				{amount_history_id: i, envelope_id: i, transaction_id: i, envelope_amount: 69},
				{amount_history_id: i, envelope_id: i, transaction_id: i, envelope_amount: 69}
			]
		});
	}

	for (let i = 15; i < 18; i++) {
		envelopes.push({
			envelope_id: i,
			user_id: 1,
			envelope_description: "asdf",
			balance: -40,
			max_limit: 999,
			envelope_history: [
				{amount_history_id: i, envelope_id: i, transaction_id: i, envelope_amount: 69},
				{amount_history_id: i, envelope_id: i, transaction_id: i, envelope_amount: 69},
				{amount_history_id: i, envelope_id: i, transaction_id: i, envelope_amount: 69}
			]
		});
	}

	// Horribly inefficient way to render different tiers of envelopes, but whatever
	return (
		<div className = "envelope-container">
			<div className = "envelope-title-group">
				<p className = "envelope-title">My Envelopes</p>
				<Tooltip title = "Add new envelope" placement = "bottom" arrow>
					<IconButton aria-label="add" size = "large" onClick = {() => navigate("/add")}>
						<AddCircleOutlineIcon fontSize="inherit" />
					</IconButton>
				</Tooltip>
			</div>

			<div className = "envelope-row-group">	
				<p className = "envelope-subtitle">Within Budget</p>
				<div className = "envelope-row">
					{envelopes.map((env) => {
						// Within Budget - more than half balance remaining
						if (env.balance >= env.max_limit / 2) {
							return (
								<EnvelopeListCard colorClass = {"envelope-header-good"} envelope = {env} />
							)
						}
					})}
				</div>
			</div>

			<div className = "envelope-row-group">	
				<p className = "envelope-subtitle">Nearly Used</p>
				<div className = "envelope-row">
					{envelopes.map((env) => {
						// Nearly Used - less than half, but still non zero balance
						if ((env.balance > 0) && (env.balance < env.max_limit / 2)) {
							return (
								<EnvelopeListCard colorClass = {"envelope-header-warning"} envelope = {env} />
							)
						}
					})}
				</div>
			</div>

			<div className = "envelope-row-group">	
				<p className = "envelope-subtitle">Over Budget</p>
				<div className = "envelope-row">
					{envelopes.map((env) => {
						// Over Budget - balance is zero or negative
						if (env.balance <= 0) {
							return (
								<EnvelopeListCard colorClass = {"envelope-header-danger"} envelope = {env} />
							)
						}
					})}
				</div>
			</div>
		</div>
	)
}