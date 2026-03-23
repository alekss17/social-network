import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("Profile Status Component", () => {
  test("renders the current status text", () => {
    let component;

    act(() => {
      component = TestRenderer.create(
        <ProfileStatus profileStatus="it-alekss.com" isOwner={true} UpdateProfileStats={() => {}} />
      );
    });

    const root = component.root;
    const p = root.findByType("p");

    expect(p.children[0]).toBe("it-alekss.com");
  });

  test("does not show the input before edit mode is enabled", () => {
    let component;

    act(() => {
      component = TestRenderer.create(
        <ProfileStatus profileStatus="it-alekss.com" isOwner={true} UpdateProfileStats={() => {}} />
      );
    });

    const root = component.root;
    const inputs = root.findAllByType("input");

    expect(inputs.length).toBe(0);
  });

  test("calls UpdateProfileStats after leaving edit mode", () => {
    const mockCallback = jest.fn();
    let component;

    act(() => {
      component = TestRenderer.create(
        <ProfileStatus
          profileStatus="it-alekss.com"
          isOwner={true}
          UpdateProfileStats={mockCallback}
        />
      );
    });

    const root = component.root;
    const button = root.findByType("button");

    act(() => {
      button.props.onClick();
    });

    const input = root.findByType("input");

    act(() => {
      input.props.onChange({ currentTarget: { value: "new-status" } });
    });

    const updatedInput = root.findByType("input");

    act(() => {
      updatedInput.props.onBlur();
    });

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback).toHaveBeenCalledWith("new-status");
  });

  test("shows input in edit mode", () => {
    let component;

    act(() => {
      component = TestRenderer.create(
        <ProfileStatus profileStatus="it-alekss.com" isOwner={true} UpdateProfileStats={() => {}} />
      );
    });

    const root = component.root;
    const button = root.findByType("button");

    act(() => {
      button.props.onClick();
    });

    const input = root.findByType("input");

    expect(input.props.value).toBe("it-alekss.com");
  });
});
