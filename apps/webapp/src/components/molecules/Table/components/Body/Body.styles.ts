import styled from "styled-components";

export const Wrapper = styled.div`
	overflow-y: auto;
	max-height: 50vh;

	& > div:last-child {
		div {
			border-bottom: none;
		}
	}
`;
