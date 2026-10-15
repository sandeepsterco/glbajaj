"use client";

import { useState } from "react";

type CommentField = "firstName" | "lastName" | "email" | "comment";
type FieldErrors = Partial<Record<CommentField, string>>;

interface CommentApiResponse {
  success?: boolean;
  message?: string;
  errors?: Record<string, string | string[]>;
}

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
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    setFieldErrors((prev) => {
      const next = { ...prev };
      if (name === "firstName" || name === "lastName") {
        delete next.firstName;
        delete next.lastName;
      } else if (name in next) {
        delete next[name as CommentField];
      }
      return next;
    });
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const name = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
    const validationErrors: FieldErrors = {};
    if (!name) validationErrors.firstName = "Please enter your name.";
    if (!form.email.trim()) validationErrors.email = "Please enter your email.";
    // if (!form.comment.trim())
    //   validationErrors.comment = "Please enter a comment.";

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
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
      const data: CommentApiResponse = await res.json();

      if (!res.ok || data.success === false) {
        const fieldNameMap: Record<string, CommentField> = {
          name: "firstName",
          first_name: "firstName",
          firstName: "firstName",
          last_name: "lastName",
          lastName: "lastName",
          email: "email",
          comment: "comment",
        };
        const responseFieldErrors: FieldErrors = {};

        Object.entries(data.errors ?? {}).forEach(([field, messages]) => {
          const formField = fieldNameMap[field];
          const message = Array.isArray(messages) ? messages[0] : messages;
          if (formField && message) responseFieldErrors[formField] = message;
        });

        setFieldErrors(responseFieldErrors);
        if (Object.keys(responseFieldErrors).length === 0) {
          setError(data.message || `Server responded with ${res.status}`);
        }
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="comment_success">
        <div className="comment_success_icon">✓</div>
        <div className="message">
          <h4>Thank you for your comment!</h4>
          <p>Your comment has been submitted and is under review.</p>
        </div>
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
          <h5>GL Bajaj Institute of Technology and Management</h5>
          <p>Author</p>
        </div>
      </div>

      <h4 className="font24">Leave a Reply</h4>
      {/* <p>Your email address will not be published. Required fields are marked *</p> */}

      {error && (
        <div className="comment_error" role="alert">
          {error}
        </div>
      )}

      <div>
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="input_group">
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
              {fieldErrors.firstName && (
                <p className="field-error" role="alert">
                  {fieldErrors.firstName}
                </p>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input_group">
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
              {fieldErrors.lastName && (
                <p className="field-error" role="alert">
                  {fieldErrors.lastName}
                </p>
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="input_group">
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
              {fieldErrors.email && (
                <p className="field-error" role="alert">
                  {fieldErrors.email}
                </p>
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="input_group">
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
              {/* {fieldErrors.comment && (
                <p className="field-error" role="alert">
                  {fieldErrors.comment}
                </p>
              )} */}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="input_group">
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
