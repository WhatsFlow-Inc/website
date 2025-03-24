import { LayoutChild, ScreenPreviewProps } from "@/types/flowJSON";
import React, { useRef, useState } from "react";
import Form from "./PreviewForm";
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import ContextMenu from "./PreviewContextMenu";
import { MoreVertical, X } from "lucide-react";

const ScreenPreview: React.FC<ScreenPreviewProps> = ({
  screen,
  onNext,
  onFinish,
  onBack
}) => {
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuButtonRef = useRef(null);

  // Handle menu button click
  const handleMenuClick = () => {
    if (menuButtonRef.current) {
      // @ts-ignore
      const rect = menuButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        x: 10,
        y: rect.bottom + window.scrollY
      });
    }
    setContextMenuOpen(!contextMenuOpen);
  };

  // Close context menu
  const handleCloseMenu = () => {
    setContextMenuOpen(false);
  };

  // Helper to process text content for markdown or arrays
  const processTextContent = (text: string | string[] | undefined, useMarkdown: boolean = false): string => {
    if (!text) return '';

    // Handle array of strings
    if (Array.isArray(text)) {
      return text.join('\n');
    }

    return text;
  };

  // Render different UI components based on their type
  const renderChild = (child: LayoutChild) => {
    // Skip if not visible
    if (child.visible === false) return null;

    switch (child.type) {
      case "Form":
        return (
          <Form
            formData={child}
            screenData={screen.data}
            onComplete={screen.terminal ? onFinish : onNext}
          />
        );
      case "TextHeading":
        return child.markdown ? (
          <div className="text-2xl font-bold mb-4">
            <ReactMarkdown>{processTextContent(child.text, true)}</ReactMarkdown>
          </div>
        ) : (
          <h1 className="text-2xl font-bold mb-4">{processTextContent(child.text)}</h1>
        );
      case "TextSubheading":
        return child.markdown ? (
          <div className="text-xl font-semibold mb-3">
            <ReactMarkdown>{processTextContent(child.text, true)}</ReactMarkdown>
          </div>
        ) : (
          <h2 className="text-xl font-semibold mb-3">{processTextContent(child.text)}</h2>
        );
      case "TextBody":
        return child.markdown ? (
          <div className="text-base mb-3">
            <ReactMarkdown>{processTextContent(child.text, true)}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-base mb-3">{processTextContent(child.text)}</p>
        );
      case "TextCaption":
        return child.markdown ? (
          <div className="text-sm text-gray-500 mb-2">
            <ReactMarkdown>{processTextContent(child.text, true)}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-2">{processTextContent(child.text)}</p>
        );
      case "RichText":
        return (
          <div className="mb-4 overflow-x-auto">
            <ReactMarkdown className="prose prose-sm max-w-none">
              {processTextContent(child.text, true)}
            </ReactMarkdown>
          </div>
        );
      case "Footer":
        return (
          <div className="mt-auto">
            <Button
              className="w-full py-3 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={screen.terminal ? onFinish : onNext}
            >
              {child.label || (screen.terminal ? "Finish" : "Continue")}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-md max-w-md mx-auto relative">
      {/* Header */}
      <div className="bg-gray-100 p-3 flex items-center justify-between">
        <button
          className="p-1 rounded-full hover:bg-gray-200"
          onClick={onBack}
        >
          <X className="h-6 w-6" />
        </button>
        <div className="font-semibold">{screen.title}</div>
        <button
          className="p-1 rounded-full hover:bg-gray-200"
          onClick={handleMenuClick}
          ref={menuButtonRef}
        >
          <MoreVertical className="h-6 w-6" />
        </button>
      </div>

      <ContextMenu
        isOpen={contextMenuOpen}
        onClose={handleCloseMenu}
        position={menuPosition}
      />

      {/* Screen content */}
      <div className="flex-1 p-4 flex flex-col overflow-y-auto">
        {screen.layout.children.map((child, index) => (
          <React.Fragment key={index}>
            {renderChild(child)}
          </React.Fragment>
        ))}
      </div>

      {/* Footer disclaimer */}
      <div className="text-xs text-center text-gray-400 p-2 border-t">
        Managed by the business. <span className="text-green-500">Learn more</span>
      </div>
    </div>
  );
};

export default ScreenPreview