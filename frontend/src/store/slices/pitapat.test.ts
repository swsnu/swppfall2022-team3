import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import { Pitapat } from "../../types";
import pitapatReducer, { pitapatAction } from "./pitapat";
import { pitapats } from "../../dummyData";


describe("pitapat reducer", () => {
  let store: EnhancedStore<
    { pitapat: { pitapats: Pitapat[] } },
    AnyAction,
    [ThunkMiddleware<{ pitapat: { pitapats: Pitapat[] } }, AnyAction, undefined>]
  >;

  beforeEach(() => {
    store = configureStore({ reducer: { pitapat: pitapatReducer } });
  });

  it("should have initial state", () => {
    expect(store.getState().pitapat.pitapats).toEqual(pitapats);
  });

  it("should add a pitapat properly", () => {
    const newPitapat: Pitapat = {
      from: 100,
      to: 200,
    };

    store.dispatch(pitapatAction.add(newPitapat));
    expect(store.getState().pitapat.pitapats).toEqual([...pitapats, newPitapat]);
  });

  it("should add a pitapat properly", () => {
    store.dispatch(pitapatAction.delete(pitapats[0]));
    expect(store.getState().pitapat.pitapats.indexOf(pitapats[0])).toEqual(-1);
  });

  it("should toggle a pitapat properly", () => {
    const newPitapat: Pitapat = {
      from: 100,
      to: 200,
    };

    store.dispatch(pitapatAction.toggle(newPitapat));
    expect(store.getState().pitapat.pitapats).toEqual([...pitapats, newPitapat]);
    store.dispatch(pitapatAction.toggle(newPitapat));
    expect(store.getState().pitapat.pitapats.indexOf(newPitapat)).toEqual(-1);
  });
})
