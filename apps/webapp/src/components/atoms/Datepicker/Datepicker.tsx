import { Icon } from "components/atoms/Icon";
import { DefaultInputProps, Input } from "components/atoms/Input";
import { Spreader } from "components/atoms/Spreader";
/* eslint-disable import/no-duplicates */
import { getMonth, getYear } from "date-fns";
import enUS from "date-fns/locale/en-US";
import plPL from "date-fns/locale/pl";
/* eslint-disable import/no-duplicates */
import { ChangeEvent, FC, useMemo, useRef } from "react";
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from "react-datepicker";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Box } from "../Box";
import { ArrowButton, StyledSelect } from "./Datepicker.styles";

registerLocale("pl-PL", plPL);
registerLocale("en-US", enUS);

interface DatepickerProps extends ReactDatePickerProps {
	inputProps?: DefaultInputProps;
}

export const Datepicker: FC<DatepickerProps> = ({ inputProps, ...props }) => {
	const { i18n } = useTranslation();

	const stopYear = getYear(props?.maxDate || new Date());
	const startYear = getYear(props?.minDate || new Date("01-01-1990"));

	const years = useMemo(
		() => Array.from({ length: stopYear - startYear + 1 }, (_, index) => startYear + index),
		[stopYear, startYear],
	);

	const currentYear = useRef<number>(new Date().getFullYear());

	const months = useMemo(() => {
		const { format } = new Intl.DateTimeFormat(i18n.language, { month: "long" });

		return [...Array(12).keys()].map(m => format(new Date(Date.UTC(currentYear.current, m))));
	}, [i18n.language]);

	return (
		<ReactDatePicker
			{...props}
			locale={i18n.language}
			dateFormat="dd-MM-yyyy"
			customInput={<Input type="date" {...inputProps} />}
			showPopperArrow={false}
			popperModifiers={[
				{
					name: "offset",
					options: {
						offset: [0, -5],
					},
				},
			]}
			renderCustomHeader={({
				date,
				changeYear,
				changeMonth,
				decreaseMonth,
				increaseMonth,
				prevMonthButtonDisabled,
				nextMonthButtonDisabled,
			}) => (
				<Box $flex $justifyContent="space-between">
					<ArrowButton type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
						<Icon icon={FaChevronLeft} />
					</ArrowButton>

					<Box $flex>
						<StyledSelect
							value={getYear(date)}
							onChange={({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
								changeYear(Number(value));
							}}
						>
							{years.map(option => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</StyledSelect>

						<Spreader $spread="0.25" />

						<StyledSelect
							value={months[getMonth(date)]}
							onChange={({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
								changeMonth(months.indexOf(value));
							}}
						>
							{months.map(option => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</StyledSelect>
					</Box>

					<ArrowButton type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
						<Icon icon={FaChevronRight} />
					</ArrowButton>
				</Box>
			)}
		/>
	);
};

Datepicker.displayName = "Datepicker";
