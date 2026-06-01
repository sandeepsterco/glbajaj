"use client";

import { useState } from "react";

interface BlogCommentFormProps {
  blogSlug: string;
  apiBase?: string;
}

export default function BlogCommentForm({
  blogSlug,
  apiBase = "https://project-demo.in/gl-bajaj/api/blogs/comment",
}: BlogCommentFormProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comment: "",
    saveInfo: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setError(null);

    const name = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
    if (!name || !form.email.trim() || !form.comment.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    const params = new URLSearchParams({
      name,
      email: form.email.trim(),
      comment: form.comment.trim(),
    });

    const url = `${apiBase}/${blogSlug}?${params.toString()}`;

    try {
      setLoading(true);
      const res = await fetch(url, { method: "POST" });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="comment_success">
        <div className="comment_success_icon">✓</div>
        <h4>Thank you for your comment!</h4>
        <p>Your comment has been submitted and is under review.</p>
      </div>
    );
  }

  return (
    <div className="admin_form">
      <div className="admin_header">
        <figure>
          <img
            src="/images/admin-profile.webp"
            className="img-fluid"
            alt="admin profile"
          />
        </figure>
        <div className="admin_details">
          <h5>Admin</h5>
          <p>Author</p>
        </div>
      </div>

      <h4 className="font24">Leave a Reply</h4>
      <p>Your email address will not be published. Required fields are marked *</p>

      {error && (
        <div className="comment_error" role="alert">
          {error}
        </div>
      )}

      <div>
        <div className="row g-4">
          <div className="col-lg-6">
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First name *"
              aria-label="First name"
              value={form.firstName}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="col-lg-6">
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last name"
              aria-label="Last name"
              value={form.lastName}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="col-lg-12">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email *"
              aria-label="Email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="col-lg-12">
            <textarea
              name="comment"
              className="form-control"
              id="blogComment"
              rows={5}
              placeholder="Comment *"
              value={form.comment}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="col-lg-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
                name="saveInfo"
                checked={form.saveInfo}
                onChange={handleChange}
                disabled={loading}
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Save my name, email, and website in this browser for the next
                time I comment.
              </label>
            </div>
          </div>
          <div className="col-lg-12">
            <button
              type="button"
              className="btn post_cumment"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Post Comment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}