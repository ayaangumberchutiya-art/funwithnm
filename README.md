# NM Lab Auto-Copy Code Helper

Ye project numerical methods lab ke saare C++ codes ko instant URL routing ke zariye copy karne aur 1 second me window auto-close karne ke liye banaya gaya hai.

---

## 🚀 Saare Keywords List (Clean Routes)

| Sl No. | URL Route / Keyword | Topic / Method Name |
|---|---|---|
| 1 | `/simpsons-13` | Simpson's 1/3 Rule (Quadratic Numerical Integration) |
| 2 | `/trapezoidal` | Trapezoidal Method (1D Numerical Integration) |
| 3 | `/double-integral` | Double Integral using Trapezoidal Grid Method |
| 4 | `/gaussian-quadrature` | Gaussian Quadrature Integration (Gauss-Legendre) |
| 5 | `/bisection` | Bisection Method (Root Finding) |
| 6 | `/regula-falsi` | Regula Falsi / False Position Method |
| 7 | `/newton-raphson` | Newton-Raphson Method (Single Variable) |
| 8 | `/secant` | Secant Method (Root of x^2 - 2) |
| 9 | `/root-compare` | Comparison of Root Finding Methods (Error vs Iteration) |
| 10 | `/gaussian-elimination` | Gaussian Elimination (Matrix System Hx = b) |
| 11 | `/forward-error` | Forward Error Calculation (L2 & Infinity Norms) |
| 12 | `/pivoting` | Gaussian Elimination with Partial Pivoting |
| 13 | `/lu-decomposition` | LU Decomposition (Matrix Inversion) |
| 14 | `/cholesky` | Cholesky Decomposition for Symmetric System (L L^T) |
| 15 | `/gauss-jacobi` | Gauss-Jacobi Iterative Method |
| 16 | `/gauss-seidel` | Gauss-Seidel Iterative Method |
| 17 | `/multivariable-newton-2d` | Multivariable Newton-Raphson (2x2 Jacobian) |
| 18 | `/multivariable-newton-3d` | Multivariable Newton-Raphson (3x3 Jacobian) |
| 19 | `/newton-divided-diff` | Newton's Divided Difference Interpolation |
| 20 | `/lagrange` | Lagrange Basis Polynomials & Interpolation |
| 21 | `/differentiation` | Forward, Backward & Central Finite Differences |
| 22 | `/newton-optimization-cholesky` | 3D Newton's Optimization with Cholesky on Hessian |
| 23 | `/parabolic-pde` | Parabolic PDE (Explicit Finite Difference Heat Equation) |
| 24 | `/elliptic-pde` | Elliptic PDE (2D Laplace Interior Grid Solve) |
| 25 | `/scarborough` | Scarborough Criterion & Percent Relative Error |
| 26 | `/maclaurin-cos` | Maclaurin Series Approximation for cos(x) |

---

## 🛠 Localhost Pe Run Karna:
Is folder me open karke:
```bash
npx serve .
```
Ya Python se:
```bash
python -m http.server 3000
```
Open karo: `http://localhost:3000/simpsons-13`

---

## 🌐 Vercel Par Deploy Karna:
1. `npm i -g vercel` (agar installed nahi hai)
2. Is folder ke andar terminal me type karo:
```bash
vercel --prod
```
Ya GitHub repo bana kar Vercel dashboard par import kar do! `vercel.json` already configured hai jo clean routing handle karta hai.
