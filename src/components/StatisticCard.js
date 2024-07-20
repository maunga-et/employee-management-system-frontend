import {Card} from "antd";

const StatisticCard = ({name, count}) => {
	return (
		<Card
			style={{
				width: 220
			}}
			className='shadow'
		>
			<h6 className='text-center small text-muted'>{name}</h6>
			<h1 className='display-4 fw-bolder text-center'>{count}</h1>
		</Card>
	)
}

export default StatisticCard
