// src/components/dropdown/Dropdown.tsx

import type React from "react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;

  /**
   * ID dynamique du bouton qui ouvre le dropdown.
   */
  triggerId: string;
}

type Position = {
  top: number;
  left: number;
  maxHeight?: number;
};

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  triggerId,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
  });

  // ==========================================================
  // CALCUL DE LA POSITION
  // ==========================================================

  const updatePosition = useCallback(() => {
    const dropdown = dropdownRef.current;

    const toggle = document.getElementById(triggerId);

    if (!dropdown || !toggle) {
      return;
    }

    const toggleRect = toggle.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const margin = 8;
    const gap = 8;

    // --------------------------------------------------------
    // Dimensions du dropdown
    // --------------------------------------------------------

    const dropdownRect =
      dropdown.getBoundingClientRect();

    const dropdownWidth =
      dropdownRect.width;

    const dropdownHeight =
      dropdownRect.height;

    // --------------------------------------------------------
    // ESPACE DISPONIBLE
    // --------------------------------------------------------

    const spaceBelow =
      viewportHeight -
      toggleRect.bottom -
      margin;

    const spaceAbove =
      toggleRect.top -
      margin;

    // --------------------------------------------------------
    // POSITION VERTICALE
    // --------------------------------------------------------

    let top: number;

    if (
      spaceBelow >=
      dropdownHeight + gap
    ) {
      // En dessous
      top =
        toggleRect.bottom + gap;
    } else if (
      spaceAbove >=
      dropdownHeight + gap
    ) {
      // Au-dessus
      top =
        toggleRect.top -
        dropdownHeight -
        gap;
    } else if (
      spaceBelow >= spaceAbove
    ) {
      // Plus d'espace en dessous
      top =
        toggleRect.bottom + gap;
    } else {
      // Plus d'espace au-dessus
      top =
        toggleRect.top -
        dropdownHeight -
        gap;
    }

    // --------------------------------------------------------
    // POSITION HORIZONTALE
    // --------------------------------------------------------

    /*
     * Alignement du bord droit du dropdown
     * avec le bord droit du bouton.
     */
    let left =
      toggleRect.right -
      dropdownWidth;

    /*
     * Si ça dépasse à gauche,
     * on aligne sur le bord gauche du bouton.
     */
    if (left < margin) {
      left = toggleRect.left;
    }

    // --------------------------------------------------------
    // EMPÊCHER LE DÉBORDEMENT HORIZONTAL
    // --------------------------------------------------------

    const maxLeft = Math.max(
      margin,
      viewportWidth -
        dropdownWidth -
        margin
    );

    left = Math.min(
      Math.max(margin, left),
      maxLeft
    );

    // --------------------------------------------------------
    // EMPÊCHER LE DÉBORDEMENT VERTICAL
    // --------------------------------------------------------

    const maxTop = Math.max(
      margin,
      viewportHeight -
        dropdownHeight -
        margin
    );

    top = Math.min(
      Math.max(margin, top),
      maxTop
    );

    // --------------------------------------------------------
    // HAUTEUR DISPONIBLE
    // --------------------------------------------------------

    let availableHeight: number;

    if (top < toggleRect.top) {
      availableHeight =
        toggleRect.top -
        top -
        gap;
    } else {
      availableHeight =
        viewportHeight -
        top -
        margin;
    }

    setPosition({
      top,
      left,
      maxHeight: Math.max(
        120,
        availableHeight
      ),
    });
  }, [triggerId]);

  // ==========================================================
  // POSITION INITIALE
  // ==========================================================

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    const frame =
      requestAnimationFrame(() => {
        updatePosition();
      });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [
    isOpen,
    updatePosition,
  ]);

  // ==========================================================
  // RECALCUL SCROLL / RESIZE
  // ==========================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleUpdate = () => {
      updatePosition();
    };

    window.addEventListener(
      "resize",
      handleUpdate
    );

    window.addEventListener(
      "scroll",
      handleUpdate,
      true
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleUpdate
      );

      window.removeEventListener(
        "scroll",
        handleUpdate,
        true
      );
    };
  }, [
    isOpen,
    updatePosition,
  ]);

  // ==========================================================
  // CLICK OUTSIDE
  // ==========================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (
      event: MouseEvent
    ) => {
      const target =
        event.target as Node;

      const dropdown =
        dropdownRef.current;

      const toggle =
        document.getElementById(
          triggerId
        );

      if (!dropdown) {
        return;
      }

      const clickedInsideDropdown =
        dropdown.contains(target);

      const clickedToggle =
        toggle?.contains(target) ??
        false;

      if (
        !clickedInsideDropdown &&
        !clickedToggle
      ) {
        onClose();
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [
    isOpen,
    onClose,
    triggerId,
  ]);

  // ==========================================================
  // ESCAPE
  // ==========================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [
    isOpen,
    onClose,
  ]);

  // ==========================================================
  // RENDER
  // ==========================================================

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      className={`
        fixed
        z-[9999]
        min-w-[200px]
        max-w-[calc(100vw-16px)]
        overflow-y-auto
        rounded-xl
        border
        border-gray-200
        bg-white
        py-1
        shadow-xl
        dark:border-gray-800
        dark:bg-gray-900
        ${className}
      `}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        maxHeight:
          position.maxHeight
            ? `${position.maxHeight}px`
            : undefined,
      }}
    >
      {children}
    </div>
  );
};