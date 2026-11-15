// Database of all Numerical Methods Lab questions with full C++ code

const CODES = {
  // Lab 1
  "scarborough": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

int main() {
    int n = 8;
    double es = 0.5 * pow(10.0, 2 - n); // Scarborough criterion (%)
    double x = 0.5;
    double true_val = exp(x);
    
    double term = 1.0;
    double approx = term;
    int step = 1;
    
    cout << fixed << setprecision(8);
    cout << "Step 0: Approx = " << approx << ", True Val = " << true_val << endl;
    
    while (true) {
        term *= (x / step);
        double prev_approx = approx;
        approx += term;
        double ea = fabs((approx - prev_approx) / approx) * 100.0;
        double et = fabs((true_val - approx) / true_val) * 100.0;
        
        cout << "Step " << step << ": Approx = " << approx 
             << ", True Error = " << et << "%, Approx Error = " << ea << "%\\n";
             
        if (ea < es) break;
        step++;
    }
    cout << "\\nStopping condition met at step " << step << endl;
    return 0;
}`,

  "maclaurin-cos": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

int main() {
    int n = 8;
    double es = 0.5 * pow(10.0, 2 - n);
    double x = 0.3 * M_PI;
    double true_val = cos(x);
    
    double term = 1.0;
    double approx = term;
    int k = 1;
    
    cout << fixed << setprecision(8);
    cout << "Term 1: Approx = " << approx << endl;
    
    while (true) {
        term *= - (x * x) / ((2 * k - 1) * (2 * k));
        double prev_approx = approx;
        approx += term;
        double ea = fabs((approx - prev_approx) / approx) * 100.0;
        
        cout << "Term " << (k + 1) << ": Approx = " << approx 
             << ", Rel Error = " << ea << "%\\n";
             
        if (ea < es) {
            cout << "\\nNumber of terms necessary: " << (k + 1) << endl;
            break;
        }
        k++;
    }
    return 0;
}`,

  // Lab 2 & 3: Single-variable root finding
  "bisection": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

double f(double x) {
    return x*x*x - x - 1;
}

int main() {
    double a = 1.0, b = 2.0;
    double tol = 1e-5;
    int iter = 0;
    double c;
    
    if (f(a) * f(b) >= 0) {
        cout << "Invalid interval [a, b]\\n";
        return 1;
    }
    
    cout << fixed << setprecision(6);
    cout << "Iter\\t   a\\t\\t   b\\t\\t   c\\t\\t  f(c)\\n";
    cout << "---------------------------------------------------------\\n";
    
    while ((b - a) / 2.0 > tol) {
        c = (a + b) / 2.0;
        iter++;
        cout << iter << "\\t" << a << "\\t" << b << "\\t" << c << "\\t" << f(c) << "\\n";
        
        if (fabs(f(c)) < tol) break;
        if (f(a) * f(c) < 0) b = c;
        else a = c;
    }
    cout << "\\nRoot found: " << c << " in " << iter << " iterations.\\n";
    return 0;
}`,

  "regula-falsi": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

double f(double x) {
    return x*x*x - x - 1;
}

int main() {
    double a = 1.0, b = 2.0;
    double tol = 1e-5;
    double c = a;
    int iter = 0;
    
    cout << fixed << setprecision(6);
    cout << "Iter\\t   a\\t\\t   b\\t\\t   c\\t\\t  f(c)\\n";
    cout << "---------------------------------------------------------\\n";
    
    while (true) {
        double fa = f(a), fb = f(b);
        double c_prev = c;
        c = (a * fb - b * fa) / (fb - fa);
        iter++;
        
        cout << iter << "\\t" << a << "\\t" << b << "\\t" << c << "\\t" << f(c) << "\\n";
        
        if (fabs(c - c_prev) < tol || fabs(f(c)) < tol) break;
        
        if (fa * f(c) < 0) b = c;
        else a = c;
    }
    cout << "\\nRoot found: " << c << " in " << iter << " iterations.\\n";
    return 0;
}`,

  "newton-raphson": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

double f(double x) {
    return x*x*x - 2*x*x - x + 2;
}

double df(double x) {
    return 3*x*x - 4*x - 1;
}

int main() {
    double x0 = 3.0; // Starting point
    double tol = 1e-6;
    int max_iter = 100;
    
    cout << fixed << setprecision(6);
    cout << "Iter\\t   x_n\\t\\t   f(x_n)\\t   f'(x_n)\\n";
    cout << "-------------------------------------------------\\n";
    
    for (int iter = 1; iter <= max_iter; iter++) {
        double y = f(x0);
        double dy = df(x0);
        
        cout << iter << "\\t" << x0 << "\\t" << y << "\\t" << dy << "\\n";
        
        if (fabs(dy) < 1e-12) {
            cout << "Derivative zero, method failed.\\n";
            return 1;
        }
        
        double x1 = x0 - y / dy;
        if (fabs(x1 - x0) < tol) {
            cout << "\\nRoot found: " << x1 << " in " << iter << " iterations.\\n";
            return 0;
        }
        x0 = x1;
    }
    return 0;
}`,

  "secant": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

double f(double x) {
    return x*x - 2; // Find sqrt(2)
}

int main() {
    double x0 = 0.0, x1 = 2.0;
    double tol = 1e-6;
    int max_iter = 50;
    
    cout << fixed << setprecision(6);
    cout << "Iter\\t   x_n\\t\\t   f(x_n)\\n";
    cout << "-----------------------------------\\n";
    
    for (int iter = 1; iter <= max_iter; iter++) {
        double f0 = f(x0), f1 = f(x1);
        if (fabs(f1 - f0) < 1e-12) {
            cout << "Division by zero.\\n";
            return 1;
        }
        
        double x2 = x1 - f1 * (x1 - x0) / (f1 - f0);
        cout << iter << "\\t" << x2 << "\\t" << f(x2) << "\\n";
        
        if (fabs(x2 - x1) < tol) {
            cout << "\\nRoot found: " << x2 << " in " << iter << " iterations.\\n";
            return 0;
        }
        x0 = x1;
        x1 = x2;
    }
    return 0;
}`,

  "root-compare": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

double f(double x) { return exp(-x) - x; }
double df(double x) { return -exp(-x) - 1; }

int main() {
    double true_root = 0.56714329;
    cout << "Comparison for f(x) = exp(-x) - x\\n";
    cout << fixed << setprecision(6);
    
    // Bisection
    double a = 0, b = 1;
    cout << "\\n--- Bisection Method ---\\n";
    for(int i = 1; i <= 6; ++i) {
        double c = (a + b) / 2.0;
        double err = fabs((true_root - c) / true_root) * 100.0;
        cout << "Iter " << i << ": c = " << c << ", True Rel Error = " << err << "%\\n";
        if(f(a) * f(c) < 0) b = c; else a = c;
    }
    
    // Regula Falsi
    a = 0; b = 1;
    cout << "\\n--- Regula Falsi Method ---\\n";
    for(int i = 1; i <= 6; ++i) {
        double c = (a * f(b) - b * f(a)) / (f(b) - f(a));
        double err = fabs((true_root - c) / true_root) * 100.0;
        cout << "Iter " << i << ": c = " << c << ", True Rel Error = " << err << "%\\n";
        if(f(a) * f(c) < 0) b = c; else a = c;
    }
    
    // Secant
    double x0 = 0, x1 = 1;
    cout << "\\n--- Secant Method ---\\n";
    for(int i = 1; i <= 6; ++i) {
        double x2 = x1 - f(x1) * (x1 - x0) / (f(x1) - f(x0));
        double err = fabs((true_root - x2) / true_root) * 100.0;
        cout << "Iter " << i << ": x = " << x2 << ", True Rel Error = " << err << "%\\n";
        x0 = x1; x1 = x2;
    }
    return 0;
}`,

  // Lab 4: Linear Systems
  "gaussian-elimination": `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

int main() {
    int n = 3;
    vector<vector<double>> A = {
        {1.0, 1.0/2.0, 1.0/3.0},
        {1.0/2.0, 1.0/3.0, 1.0/4.0},
        {1.0/3.0, 1.0/4.0, 1.0/5.0}
    };
    vector<double> b = {11.0/6.0, 13.0/12.0, 47.0/60.0};

    // Forward Elimination
    for (int k = 0; k < n - 1; k++) {
        for (int i = k + 1; i < n; i++) {
            double factor = A[i][k] / A[k][k];
            for (int j = k; j < n; j++) {
                A[i][j] -= factor * A[k][j];
            }
            b[i] -= factor * b[k];
        }
    }

    // Back Substitution
    vector<double> x(n);
    for (int i = n - 1; i >= 0; i--) {
        double sum = b[i];
        for (int j = i + 1; j < n; j++) {
            sum -= A[i][j] * x[j];
        }
        x[i] = sum / A[i][i];
    }

    cout << fixed << setprecision(6);
    cout << "Solution x:\\n";
    for (int i = 0; i < n; i++) {
        cout << "x[" << i << "] = " << x[i] << endl;
    }
    return 0;
}`,

  "forward-error": `#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>
using namespace std;

int main() {
    vector<double> x_computed = {1.0, 1.0, 1.0}; // Result from Gaussian Elimination
    vector<double> x_true = {1.0, 1.0, 1.0};     // True solution

    double max_err = 0.0;
    double norm_diff = 0.0;
    double norm_true = 0.0;

    for (size_t i = 0; i < x_computed.size(); i++) {
        double diff = fabs(x_computed[i] - x_true[i]);
        if (diff > max_err) max_err = diff;
        norm_diff += diff * diff;
        norm_true += x_true[i] * x_true[i];
    }

    norm_diff = sqrt(norm_diff);
    norm_true = sqrt(norm_true);

    cout << fixed << setprecision(8);
    cout << "Infinity Norm Forward Error: " << max_err << endl;
    cout << "Euclidean (L2) Forward Error: " << norm_diff << endl;
    cout << "Relative Forward Error: " << (norm_diff / norm_true) << endl;
    return 0;
}`,

  "pivoting": `#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>
using namespace std;

void solveWithPivoting(vector<vector<double>> A, vector<double> b) {
    int n = 3;
    for (int k = 0; k < n - 1; k++) {
        int max_row = k;
        for (int i = k + 1; i < n; i++) {
            if (fabs(A[i][k]) > fabs(A[max_row][k])) max_row = i;
        }
        swap(A[k], A[max_row]);
        swap(b[k], b[max_row]);

        for (int i = k + 1; i < n; i++) {
            double factor = A[i][k] / A[k][k];
            for (int j = k; j < n; j++) A[i][j] -= factor * A[k][j];
            b[i] -= factor * b[k];
        }
    }
    vector<double> x(n);
    for (int i = n - 1; i >= 0; i--) {
        double sum = b[i];
        for (int j = i + 1; j < n; j++) sum -= A[i][j] * x[j];
        x[i] = sum / A[i][i];
    }
    cout << "Result with Partial Pivoting:\\n";
    for (int i = 0; i < n; i++) cout << "x[" << i << "] = " << x[i] << "\\n";
}

int main() {
    vector<vector<double>> A = {
        {0.000001, 1.0, 1.0},
        {1.0, 1.0, 1.0},
        {1.0, 1.0, 2.0}
    };
    vector<double> b = {2.0, 3.0, 4.0};
    cout << fixed << setprecision(6);
    solveWithPivoting(A, b);
    return 0;
}`,

  "lu-decomposition": `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

int main() {
    int n = 3;
    vector<vector<double>> A = {
        {3.0, -0.1, -0.2},
        {0.1, 7.0, -0.3},
        {0.3, -0.2, 10.0}
    };
    vector<vector<double>> L(n, vector<double>(n, 0.0));
    vector<vector<double>> U(n, vector<double>(n, 0.0));

    // Doolittle Algorithm
    for (int i = 0; i < n; i++) {
        for (int k = i; k < n; k++) {
            double sum = 0;
            for (int j = 0; j < i; j++) sum += (L[i][j] * U[j][k]);
            U[i][k] = A[i][k] - sum;
        }
        for (int k = i; k < n; k++) {
            if (i == k) L[i][i] = 1.0;
            else {
                double sum = 0;
                for (int j = 0; j < i; j++) sum += (L[k][j] * U[j][i]);
                L[k][i] = (A[k][i] - sum) / U[i][i];
            }
        }
    }

    cout << fixed << setprecision(5);
    cout << "Matrix L:\\n";
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) cout << setw(10) << L[i][j] << " ";
        cout << "\\n";
    }

    cout << "\\nMatrix U:\\n";
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) cout << setw(10) << U[i][j] << " ";
        cout << "\\n";
    }
    return 0;
}`,

  "cholesky": `#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>
using namespace std;

int main() {
    int n = 3;
    vector<vector<double>> A = {
        {8.0, 20.0, 15.0},
        {20.0, 80.0, 50.0},
        {15.0, 50.0, 60.0}
    };
    vector<double> b = {100.0, 250.0, 100.0};
    vector<vector<double>> L(n, vector<double>(n, 0.0));

    // Cholesky Banachiewicz algorithm
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            double sum = 0;
            for (int k = 0; k < j; k++) sum += L[i][k] * L[j][k];
            if (i == j)
                L[i][j] = sqrt(A[i][i] - sum);
            else
                L[i][j] = (A[i][j] - sum) / L[j][j];
        }
    }

    cout << fixed << setprecision(4);
    cout << "Matrix L:\\n";
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) cout << setw(10) << L[i][j] << " ";
        cout << "\\n";
    }

    // Solve L * y = b (Forward substitution)
    vector<double> y(n);
    for (int i = 0; i < n; i++) {
        double sum = b[i];
        for (int j = 0; j < i; j++) sum -= L[i][j] * y[j];
        y[i] = sum / L[i][i];
    }

    // Solve L^T * x = y (Back substitution)
    vector<double> x(n);
    for (int i = n - 1; i >= 0; i--) {
        double sum = y[i];
        for (int j = i + 1; j < n; j++) sum -= L[j][i] * x[j];
        x[i] = sum / L[i][i];
    }

    cout << "\\nSolution X:\\n";
    for (int i = 0; i < n; i++) cout << "x[" << i + 1 << "] = " << x[i] << "\\n";
    return 0;
}`,

  "gauss-jacobi": `#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>
using namespace std;

int main() {
    // 3x1 + x2 = 8  =>  x1 = (8 - x2)/3
    // 5x1 + 5x2 = 20 => x2 = (20 - 5x1)/5
    double x1 = 0, x2 = 0;
    double tol = 1e-5;
    cout << fixed << setprecision(6);
    cout << "Iter\\t   x1\\t\\t   x2\\n";
    cout << "---------------------------------\\n";
    
    for (int iter = 1; iter <= 25; iter++) {
        double x1_new = (8.0 - x2) / 3.0;
        double x2_new = (20.0 - 5.0 * x1) / 5.0;
        
        cout << iter << "\\t" << x1_new << "\\t" << x2_new << "\\n";
        if (fabs(x1_new - x1) < tol && fabs(x2_new - x2) < tol) break;
        x1 = x1_new;
        x2 = x2_new;
    }
    return 0;
}`,

  "gauss-seidel": `#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>
using namespace std;

int main() {
    double x1 = 0, x2 = 0;
    double tol = 1e-5;
    cout << fixed << setprecision(6);
    cout << "Iter\\t   x1\\t\\t   x2\\n";
    cout << "---------------------------------\\n";
    
    for (int iter = 1; iter <= 25; iter++) {
        double x1_old = x1, x2_old = x2;
        x1 = (8.0 - x2) / 3.0;
        x2 = (20.0 - 5.0 * x1) / 5.0; // uses freshly updated x1
        
        cout << iter << "\\t" << x1 << "\\t" << x2 << "\\n";
        if (fabs(x1 - x1_old) < tol && fabs(x2 - x2_old) < tol) break;
    }
    return 0;
}`,

  // Lab 6: Multivariable Non-linear
  "multivariable-newton-2d": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

int main() {
    // f(x,y) = x^2 + y^2 - 5 = 0
    // g(x,y) = x^3 + y^3 - 2 = 0
    double x = 2.0, y = -1.0;
    cout << fixed << setprecision(5);
    
    for (int iter = 1; iter <= 3; iter++) {
        double f = x*x + y*y - 5.0;
        double g = x*x*x + y*y*y - 2.0;
        
        double j11 = 2*x,     j12 = 2*y;
        double j21 = 3*x*x,   j22 = 3*y*y;
        
        double det = j11 * j22 - j12 * j21;
        
        // J^(-1) * [f, g]^T
        double dx = (j22 * f - j12 * g) / det;
        double dy = (-j21 * f + j11 * g) / det;
        
        x -= dx;
        y -= dy;
        
        cout << "Iteration " << iter << ": [x" << iter << ", y" << iter << "] = [" 
             << x << ", " << y << "]\\n";
    }
    return 0;
}`,

  "multivariable-newton-3d": `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

// Solves 3x3 linear system A * dx = F
vector<double> solve3x3(vector<vector<double>> A, vector<double> F) {
    for (int i = 0; i < 3; i++) {
        for (int k = i + 1; k < 3; k++) {
            double c = A[k][i] / A[i][i];
            for (int j = i; j < 3; j++) A[k][j] -= c * A[i][j];
            F[k] -= c * F[i];
        }
    }
    vector<double> dx(3);
    for (int i = 2; i >= 0; i--) {
        double sum = F[i];
        for (int j = i + 1; j < 3; j++) sum -= A[i][j] * dx[j];
        dx[i] = sum / A[i][i];
    }
    return dx;
}

int main() {
    double x = 1.0, y = 2.0, z = 3.0;
    cout << fixed << setprecision(4);
    
    for (int iter = 1; iter <= 3; iter++) {
        double f = x*x + y*y + z*z - 14.0;
        double g = x*x + y*y - z - 8.0;
        double h = x + y + z - 6.0;
        
        vector<vector<double>> J = {
            {2*x, 2*y, 2*z},
            {2*x, 2*y, -1.0},
            {1.0, 1.0, 1.0}
        };
        vector<double> F = {f, g, h};
        vector<double> dx = solve3x3(J, F);
        
        x -= dx[0];
        y -= dx[1];
        z -= dx[2];
        
        cout << "Iteration " << iter << ": [x" << iter << ", y" << iter << ", z" << iter 
             << "] = [" << x << ", " << y << ", " << z << "]\\n";
    }
    return 0;
}`,

  // Lab 7: Interpolation
  "newton-divided-diff": `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

int main() {
    vector<double> x = {1.0, 4.0, 6.0, 5.0};
    vector<double> y = {0.0, 1.386294, 1.791759, 1.609438};
    int n = x.size();
    vector<vector<double>> t(n, vector<double>(n, 0.0));
    
    for (int i = 0; i < n; i++) t[i][0] = y[i];
    
    for (int j = 1; j < n; j++) {
        for (int i = 0; i < n - j; i++) {
            t[i][j] = (t[i + 1][j - 1] - t[i][j - 1]) / (x[i + j] - x[i]);
        }
    }

    cout << fixed << setprecision(6);
    cout << "Divided Difference Table:\\n";
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i; j++) cout << setw(12) << t[i][j] << " ";
        cout << "\\n";
    }

    double eval_x = 2.0;
    double result = t[0][0];
    double mult = 1.0;
    for (int j = 1; j < n; j++) {
        mult *= (eval_x - x[j - 1]);
        result += mult * t[0][j];
    }

    double true_val = 0.6931472;
    cout << "\\nInterpolated value at x = " << eval_x << " : " << result << endl;
    cout << "True Error: " << fabs(true_val - result) << endl;
    return 0;
}`,

  "lagrange": `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

int main() {
    vector<double> x = {0.0, 1.0, 2.0};
    vector<double> y = {1.0, 3.0, 2.0};
    double xp = 1.5;
    double yp = 0.0;
    int n = x.size();

    cout << fixed << setprecision(6);
    cout << "Lagrange Basis Polynomials at x = " << xp << ":\\n";
    
    for (int i = 0; i < n; i++) {
        double L = 1.0;
        for (int j = 0; j < n; j++) {
            if (i != j) L *= (xp - x[j]) / (x[i] - x[j]);
        }
        cout << "L" << i << "(" << xp << ") = " << L << endl;
        yp += L * y[i];
    }

    cout << "\\nInterpolated value at x = " << xp << " : " << yp << endl;
    return 0;
}`,

  // Numerical Differentiation
  "differentiation": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

double f(double x) {
    return -0.1*pow(x,4) - 0.15*pow(x,3) - 0.5*pow(x,2) - 0.25*x + 1.2;
}

double df_true(double x) {
    return -0.4*pow(x,3) - 0.45*pow(x,2) - 1.0*x - 0.25;
}

double d2f_true(double x) {
    return -1.2*pow(x,2) - 0.9*x - 1.0;
}

int main() {
    double x = 0.5, h = 0.25;
    cout << fixed << setprecision(6);

    double d1_true = df_true(x);
    double d2_true = d2f_true(x);

    // 1st derivatives
    double d1_fwd = (f(x + h) - f(x)) / h;
    double d1_bwd = (f(x) - f(x - h)) / h;
    double d1_ctr = (f(x + h) - f(x - h)) / (2 * h);

    // 2nd derivatives
    double d2_fwd = (f(x + 2*h) - 2*f(x + h) + f(x)) / (h * h);
    double d2_bwd = (f(x) - 2*f(x - h) + f(x - 2*h)) / (h * h);
    double d2_ctr = (f(x + h) - 2*f(x) + f(x - h)) / (h * h);

    cout << "--- 1st Derivative at x = " << x << " (True = " << d1_true << ") ---\\n";
    cout << "Forward: " << d1_fwd << " | Error: " << fabs((d1_true - d1_fwd)/d1_true)*100 << "%\\n";
    cout << "Backward: " << d1_bwd << " | Error: " << fabs((d1_true - d1_bwd)/d1_true)*100 << "%\\n";
    cout << "Central: " << d1_ctr << " | Error: " << fabs((d1_true - d1_ctr)/d1_true)*100 << "%\\n";

    cout << "\\n--- 2nd Derivative at x = " << x << " (True = " << d2_true << ") ---\\n";
    cout << "Forward: " << d2_fwd << " | Error: " << fabs((d2_true - d2_fwd)/d2_true)*100 << "%\\n";
    cout << "Backward: " << d2_bwd << " | Error: " << fabs((d2_true - d2_bwd)/d2_true)*100 << "%\\n";
    cout << "Central: " << d2_ctr << " | Error: " << fabs((d2_true - d2_ctr)/d2_true)*100 << "%\\n";
    return 0;
}`,

  // Numerical Integration
  "trapezoidal": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

double f(double x) {
    return 0.2 + 25*x - 200*pow(x,2) + 675*pow(x,3) - 900*pow(x,4) + 400*pow(x,5);
}

int main() {
    double a = 0.0, b = 0.8;
    double true_val = 1.640533;
    int n = 1000; // Increase for required accuracy
    double h = (b - a) / n;
    
    double sum = 0.5 * (f(a) + f(b));
    for (int i = 1; i < n; i++) {
        sum += f(a + i * h);
    }
    double result = sum * h;
    double err = fabs((true_val - result) / true_val) * 100.0;
    
    cout << fixed << setprecision(7);
    cout << "Trapezoidal Result (n=" << n << "): " << result << endl;
    cout << "Percent Relative Error: " << err << "%" << endl;
    return 0;
}`,

  "simpsons-13": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

double f(double x) {
    return 0.2 + 25*x - 200*pow(x,2) + 675*pow(x,3) - 900*pow(x,4) + 400*pow(x,5);
}

int main() {
    double a = 0.0, b = 0.8;
    double true_val = 1.640533;
    int n = 100; // n must be even
    double h = (b - a) / n;
    
    double sum = f(a) + f(b);
    for (int i = 1; i < n; i++) {
        if (i % 2 == 1) sum += 4.0 * f(a + i * h);
        else sum += 2.0 * f(a + i * h);
    }
    double result = (h / 3.0) * sum;
    double err = fabs((true_val - result) / true_val) * 100.0;
    
    cout << fixed << setprecision(7);
    cout << "Simpson's 1/3 Result (n=" << n << "): " << result << endl;
    cout << "Percent Relative Error: " << err << "%" << endl;
    return 0;
}`,

  "double-integral": `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

double f(double x, double y) {
    return x*x + y*y;
}

int main() {
    double a = 0.0, b = 2.0;
    double c = 0.0, d = 2.0;
    int m = 4, n = 4;
    double hx = (b - a) / m;
    double hy = (d - c) / n;

    double sum = 0.0;
    for (int i = 0; i <= m; i++) {
        double wx = (i == 0 || i == m) ? 1.0 : 2.0;
        for (int j = 0; j <= n; j++) {
            double wy = (j == 0 || j == n) ? 1.0 : 2.0;
            sum += wx * wy * f(a + i * hx, c + j * hy);
        }
    }

    double result = (hx * hy / 4.0) * sum;
    cout << fixed << setprecision(4);
    cout << "Double Integral Result: " << result << endl;
    cout << "Actual Value: 10.67" << endl;
    cout << "Relative Error: " << fabs(10.67 - result)/10.67 * 100.0 << "%" << endl;
    return 0;
}`,

  "gaussian-quadrature": `#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;

double f(double t) {
    return sin((M_PI / 4.0) * (t + 1.0));
}

int main() {
    // 2-point Gauss Legendre quadrature
    double nodes2[] = {-1.0 / sqrt(3.0), 1.0 / sqrt(3.0)};
    double weights2[] = {1.0, 1.0};
    
    double I2 = weights2[0] * f(nodes2[0]) + weights2[1] * f(nodes2[1]);
    
    // 3-point Gauss Legendre quadrature
    double nodes3[] = {-sqrt(3.0 / 5.0), 0.0, sqrt(3.0 / 5.0)};
    double weights3[] = {5.0 / 9.0, 8.0 / 9.0, 5.0 / 9.0};
    
    double I3 = 0.0;
    for (int i = 0; i < 3; i++) I3 += weights3[i] * f(nodes3[i]);

    cout << fixed << setprecision(6);
    cout << "Gaussian Quadrature (n=2): " << I2 << endl;
    cout << "Gaussian Quadrature (n=3): " << I3 << endl;
    cout << "Theoretical Value (4/pi): " << (4.0 / M_PI) << endl;
    return 0;
}`,

  // Optimization & PDEs
  "newton-optimization-cholesky": `#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>
using namespace std;

// f(x, y, z) = x^2 + 2y^2 + 3z^2 + xy + yz - 2x - 3y - 4z
// Gradient g:
// df/dx = 2x + y - 2
// df/dy = x + 4y + z - 3
// df/dz = y + 6z - 4
// Hessian H (Constant):
// [2 1 0]
// [1 4 1]
// [0 1 6]

int main() {
    vector<double> x = {0.0, 0.0, 0.0};
    vector<vector<double>> H = {
        {2.0, 1.0, 0.0},
        {1.0, 4.0, 1.0},
        {0.0, 1.0, 6.0}
    };

    // Cholesky L of H
    int n = 3;
    vector<vector<double>> L(n, vector<double>(n, 0.0));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            double sum = 0;
            for (int k = 0; k < j; k++) sum += L[i][k] * L[j][k];
            if (i == j) L[i][j] = sqrt(H[i][i] - sum);
            else L[i][j] = (H[i][j] - sum) / L[j][j];
        }
    }

    cout << fixed << setprecision(6);
    for (int iter = 1; iter <= 3; iter++) {
        vector<double> g = {
            2*x[0] + x[1] - 2.0,
            x[0] + 4*x[1] + x[2] - 3.0,
            x[1] + 6*x[2] - 4.0
        };

        // Solve L * y = g
        vector<double> y(n);
        for (int i = 0; i < n; i++) {
            double sum = g[i];
            for (int j = 0; j < i; j++) sum -= L[i][j] * y[j];
            y[i] = sum / L[i][i];
        }

        // Solve L^T * delta = y
        vector<double> delta(n);
        for (int i = n - 1; i >= 0; i--) {
            double sum = y[i];
            for (int j = i + 1; j < n; j++) sum -= L[j][i] * delta[j];
            delta[i] = sum / L[i][i];
        }

        for (int i = 0; i < n; i++) x[i] -= delta[i];

        cout << "Iteration " << iter << ": [" << x[0] << ", " << x[1] << ", " << x[2] << "]\\n";
    }
    return 0;
}`,

  "parabolic-pde": `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

int main() {
    int nx = 5; // x = 0, 0.5, 1, 1.5, 2
    vector<double> u = {0.0, 0.0, 100.0, 0.0, 0.0};
    double dt = 0.1, lambda = 0.1, dx = 0.5;
    double r = lambda * dt / (dx * dx);

    cout << fixed << setprecision(4);
    cout << "Initial profile:\\n";
    for (double val : u) cout << setw(8) << val << " ";
    cout << "\\n";

    for (int iter = 1; iter <= 3; iter++) {
        vector<double> u_new = u;
        for (int i = 1; i < nx - 1; i++) {
            u_new[i] = u[i] + r * (u[i+1] - 2*u[i] + u[i-1]);
        }
        u = u_new;
        cout << "Iteration " << iter << ":\\n";
        for (double val : u) cout << setw(8) << val << " ";
        cout << "\\n";
    }
    return 0;
}`,

  "elliptic-pde": `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

int main() {
    int N = 5;
    vector<vector<double>> u(N, vector<double>(N, 0.0));
    
    // Boundary conditions
    for (int j = 0; j < N; j++) u[0][j] = 100.0; // Top
    for (int i = 0; i < N; i++) u[i][0] = 100.0; // Left
    for (int i = 0; i < N; i++) u[i][N-1] = 100.0; // Right
    for (int j = 0; j < N; j++) u[N-1][j] = 0.0;   // Bottom

    // Liebmman's / Gauss-Seidel iteration
    for (int iter = 1; iter <= 50; iter++) {
        for (int i = 1; i < N - 1; i++) {
            for (int j = 1; j < N - 1; j++) {
                u[i][j] = 0.25 * (u[i+1][j] + u[i-1][j] + u[i][j+1] + u[i][j-1]);
            }
        }
    }

    cout << fixed << setprecision(2);
    cout << "Laplace 2D Elliptic PDE Interior Points:\\n";
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) cout << setw(8) << u[i][j] << " ";
        cout << "\\n";
    }
    return 0;
}`
};
