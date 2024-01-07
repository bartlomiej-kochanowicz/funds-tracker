import { Currency } from "__generated__/graphql";
import aeFlag from "assets/svgs/flags/ae.svg";
import arFlag from "assets/svgs/flags/ar.svg";
import auFlag from "assets/svgs/flags/au.svg";
import bgFlag from "assets/svgs/flags/bg.svg";
import bhFlag from "assets/svgs/flags/bh.svg";
import brFlag from "assets/svgs/flags/br.svg";
import caFlag from "assets/svgs/flags/ca.svg";
import chFlag from "assets/svgs/flags/ch.svg";
import clFlag from "assets/svgs/flags/cl.svg";
import cnFlag from "assets/svgs/flags/cn.svg";
import coFlag from "assets/svgs/flags/co.svg";
import czFlag from "assets/svgs/flags/cz.svg";
import dkFlag from "assets/svgs/flags/dk.svg";
import euFlag from "assets/svgs/flags/eu.svg";
import gbFlag from "assets/svgs/flags/gb.svg";
import hkFlag from "assets/svgs/flags/hk.svg";
import huFlag from "assets/svgs/flags/hu.svg";
import idFlag from "assets/svgs/flags/id.svg";
import ilFlag from "assets/svgs/flags/il.svg";
import inFlag from "assets/svgs/flags/in.svg";
import jpFlag from "assets/svgs/flags/jp.svg";
import krFlag from "assets/svgs/flags/kr.svg";
import mxFlag from "assets/svgs/flags/mx.svg";
import myFlag from "assets/svgs/flags/my.svg";
import noFlag from "assets/svgs/flags/no.svg";
import nzFlag from "assets/svgs/flags/nz.svg";
import peFlag from "assets/svgs/flags/pe.svg";
import phFlag from "assets/svgs/flags/ph.svg";
import plFlag from "assets/svgs/flags/pl.svg";
import roFlag from "assets/svgs/flags/ro.svg";
import ruFlag from "assets/svgs/flags/ru.svg";
import saFlag from "assets/svgs/flags/sa.svg";
import seFlag from "assets/svgs/flags/se.svg";
import sgFlag from "assets/svgs/flags/sg.svg";
import thFlag from "assets/svgs/flags/th.svg";
import trFlag from "assets/svgs/flags/tr.svg";
import twFlag from "assets/svgs/flags/tw.svg";
import usFlag from "assets/svgs/flags/us.svg";
import zaFlag from "assets/svgs/flags/za.svg";

export const currencyFlags: Record<Currency, string> = {
	[Currency.Usd]: usFlag,
	[Currency.Eur]: euFlag,
	[Currency.Jpy]: jpFlag,
	[Currency.Gbp]: gbFlag,
	[Currency.Cny]: cnFlag,
	[Currency.Aud]: auFlag,
	[Currency.Cad]: caFlag,
	[Currency.Chf]: chFlag,
	[Currency.Hkd]: hkFlag,
	[Currency.Sgd]: sgFlag,
	[Currency.Sek]: seFlag,
	[Currency.Krw]: krFlag,
	[Currency.Nok]: noFlag,
	[Currency.Nzd]: nzFlag,
	[Currency.Inr]: inFlag,
	[Currency.Mxn]: mxFlag,
	[Currency.Twd]: twFlag,
	[Currency.Zar]: zaFlag,
	[Currency.Brl]: brFlag,
	[Currency.Dkk]: dkFlag,
	[Currency.Pln]: plFlag,
	[Currency.Thb]: thFlag,
	[Currency.Ils]: ilFlag,
	[Currency.Idr]: idFlag,
	[Currency.Czk]: czFlag,
	[Currency.Aed]: aeFlag,
	[Currency.Try]: trFlag,
	[Currency.Huf]: huFlag,
	[Currency.Clp]: clFlag,
	[Currency.Sar]: saFlag,
	[Currency.Php]: phFlag,
	[Currency.Myr]: myFlag,
	[Currency.Cop]: coFlag,
	[Currency.Rub]: ruFlag,
	[Currency.Ron]: roFlag,
	[Currency.Pen]: peFlag,
	[Currency.Bhd]: bhFlag,
	[Currency.Bgn]: bgFlag,
	[Currency.Ars]: arFlag,
};
