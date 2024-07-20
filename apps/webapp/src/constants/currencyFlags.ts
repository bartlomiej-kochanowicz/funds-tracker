import { Currency } from "__generated__/graphql";
import arFlag from "assets/svgs/flags/ar.svg";
import auFlag from "assets/svgs/flags/au.svg";
import brFlag from "assets/svgs/flags/br.svg";
import bwFlag from "assets/svgs/flags/bw.svg";
import caFlag from "assets/svgs/flags/ca.svg";
import chFlag from "assets/svgs/flags/ch.svg";
import clFlag from "assets/svgs/flags/cl.svg";
import cnFlag from "assets/svgs/flags/cn.svg";
import czFlag from "assets/svgs/flags/cz.svg";
import dkFlag from "assets/svgs/flags/dk.svg";
import egFlag from "assets/svgs/flags/eg.svg";
import euFlag from "assets/svgs/flags/eu.svg";
import gbFlag from "assets/svgs/flags/gb.svg";
import ghFlag from "assets/svgs/flags/gh.svg";
import huFlag from "assets/svgs/flags/hu.svg";
import idFlag from "assets/svgs/flags/id.svg";
import ilFlag from "assets/svgs/flags/il.svg";
import inFlag from "assets/svgs/flags/in.svg";
import isFlag from "assets/svgs/flags/is.svg";
import keFlag from "assets/svgs/flags/ke.svg";
import krFlag from "assets/svgs/flags/kr.svg";
import lkFlag from "assets/svgs/flags/lk.svg";
import maFlag from "assets/svgs/flags/ma.svg";
import muFlag from "assets/svgs/flags/mu.svg";
import mwFlag from "assets/svgs/flags/mw.svg";
import mxFlag from "assets/svgs/flags/mx.svg";
import myFlag from "assets/svgs/flags/my.svg";
import ngFlag from "assets/svgs/flags/ng.svg";
import noFlag from "assets/svgs/flags/no.svg";
import peFlag from "assets/svgs/flags/pe.svg";
import phFlag from "assets/svgs/flags/ph.svg";
import pkFlag from "assets/svgs/flags/pk.svg";
import plFlag from "assets/svgs/flags/pl.svg";
import roFlag from "assets/svgs/flags/ro.svg";
import ruFlag from "assets/svgs/flags/ru.svg";
import rwFlag from "assets/svgs/flags/rw.svg";
import seFlag from "assets/svgs/flags/se.svg";
import tgFlag from "assets/svgs/flags/tg.svg";
import thFlag from "assets/svgs/flags/th.svg";
import trFlag from "assets/svgs/flags/tr.svg";
import twFlag from "assets/svgs/flags/tw.svg";
import tzFlag from "assets/svgs/flags/tz.svg";
import ugFlag from "assets/svgs/flags/ug.svg";
import usFlag from "assets/svgs/flags/us.svg";
import vnFlag from "assets/svgs/flags/vn.svg";
import zaFlag from "assets/svgs/flags/za.svg";
import zwFlag from "assets/svgs/flags/zw.svg";

export const currencyFlags: Record<Currency, string> = {
	[Currency.Usd]: usFlag,
	[Currency.Gbp]: gbFlag,
	[Currency.Cad]: caFlag,
	[Currency.Eur]: euFlag,
	[Currency.Chf]: chFlag,
	[Currency.Isk]: isFlag,
	[Currency.Nok]: noFlag,
	[Currency.Dkk]: dkFlag,
	[Currency.Sek]: seFlag,
	[Currency.Zwl]: zwFlag,
	[Currency.Ugx]: ugFlag,
	[Currency.Tzs]: tzFlag,
	[Currency.Czk]: czFlag,
	[Currency.Rwf]: rwFlag,
	[Currency.Bwp]: bwFlag,
	[Currency.Egp]: egFlag,
	[Currency.Ngn]: ngFlag,
	[Currency.Ghs]: ghFlag,
	[Currency.Mwk]: mwFlag,
	[Currency.Xof]: tgFlag,
	[Currency.Kes]: keFlag,
	[Currency.Mad]: maFlag,
	[Currency.Mur]: muFlag,
	[Currency.Ils]: ilFlag,
	[Currency.Krw]: krFlag,
	[Currency.Huf]: huFlag,
	[Currency.Pln]: plFlag,
	[Currency.Php]: phFlag,
	[Currency.Pkr]: pkFlag,
	[Currency.Aud]: auFlag,
	[Currency.Zar]: zaFlag,
	[Currency.Clp]: clFlag,
	[Currency.Idr]: idFlag,
	[Currency.Thb]: thFlag,
	[Currency.Cny]: cnFlag,
	[Currency.Inr]: inFlag,
	[Currency.Lkr]: lkFlag,
	[Currency.Vnd]: vnFlag,
	[Currency.Myr]: myFlag,
	[Currency.Ron]: roFlag,
	[Currency.Ars]: arFlag,
	[Currency.Brl]: brFlag,
	[Currency.Mxn]: mxFlag,
	[Currency.Twd]: twFlag,
	[Currency.Rub]: ruFlag,
	[Currency.Pen]: peFlag,
	[Currency.Try]: trFlag,
};
