import styled from "styled-components";

export const FieldsWrapper = styled.div`
	overflow-y: auto;
	max-height: 250px;

	> div:not(:last-child) {
		margin-bottom: ${({ theme }) => theme.spacing["0.5"]};
	}
`;
