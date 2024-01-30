import React from 'react'

function CTA() {
  return (
    <section class="section-cta" id="try-for-free">
        
        <div class="container">
            <div class="cta-content">
                <div class="cta-text-box">
                    <h1 class="text-5xl">Wanna be a part of us!</h1>
                    <p class="cta-description">
                        Be more than a customer. Start by registering your theatre. You can cancel or pause anytime. And the first registration is on us!
                    </p>
                    <form action="#">
                        {/* <!-- Username --> */}
                        <div class="form-input">
                            <label for="username">Full Name</label>
                            <input type="text" id="username" placeholder="John Abraham" required />
                        </div>
                        {/* <!-- Email --> */}
                        <div class="form-input">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" placeholder="John@gmail.com" required />
                        </div>
                        {/* <!-- Where did you hear us --> */}
                        <div class="form-input">
                            <label for="where">Where did you hear from us</label>
                            <select name="" id="where" required>
                                <option value="">Please choose one option:</option>
                                <option value="Friends and Family">Friends and Family</option> 
                                <option value="Youtube">Youtube</option>
                                <option value="Google">Google</option>
                                <option value="Other">Others</option>
                            </select>
                        </div>
                        {/* <!-- Submit Button --> */}
                        <div class="form-submit">
                            <input type="submit" value="Open your theatre" class="submit" />
                        </div>
                    </form>
                </div>
                <div class="cta-img-box" role="image" aria-label="Women having variety of food"></div>
                
            </div>
        </div>
    </section>
  )
}

export default CTA