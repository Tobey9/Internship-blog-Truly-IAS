"use client";

import DOMPurify from "dompurify";

export default function SafeHTML({ html, className }) {
  const clean = DOMPurify.sanitize(html);
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: clean }} />
  );
}
