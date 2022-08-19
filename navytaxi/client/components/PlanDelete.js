import React from 'react';

class PlanDelete extends React.Component {
	
	deletePlan(id) {  //REST API에서는 다음과 같이 삭제를 진행함
		const url = '/api/plans/' + id;
		fetch(url, {
			method: 'DELETE'
		});
		this.props.stateRefresh();
	}
	
	render(){
		return (
			<button onClick = {(e) => {this.deletePlan(this.props.id)}}>삭제</button>
		)
	}
}

export default PlanDelete;
