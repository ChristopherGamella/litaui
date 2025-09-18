import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/ui/modal.component';
import { ButtonComponent } from '../../components/ui/button.component';
import { InputComponent } from '../../components/ui/input.component';
import { SwitchComponent } from '../../components/ui/switch.component';

/**
 * Modal Test Component
 * Comprehensive demo showcasing all modal features and configurations
 */
@Component({
  selector: 'lib-modal-test',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ButtonComponent,
    InputComponent,
    SwitchComponent
  ],
  template: `
    <div class="space-y-8 p-6">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-foreground">Modal Component Demo</h2>
        <p class="text-muted-foreground">
          Interactive modals with focus trapping, keyboard navigation, and accessibility features.
        </p>
      </div>

      <!-- Basic Modal Examples -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-foreground">Basic Modals</h3>
        
        <div class="flex flex-wrap gap-4">
          <!-- Simple Modal -->
          <lib-button (click)="basicModal.set(true)">
            Open Basic Modal
          </lib-button>

          <!-- Modal with Header -->
          <lib-button variant="outline" (click)="headerModal.set(true)">
            With Header
          </lib-button>

          <!-- Modal with Form -->
          <lib-button variant="secondary" (click)="formModal.set(true)">
            Form Modal
          </lib-button>

          <!-- Confirmation Modal -->
          <lib-button variant="destructive" (click)="confirmModal.set(true)">
            Confirmation
          </lib-button>
        </div>
      </div>

      <!-- Size Variants -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-foreground">Size Variants</h3>
        
        <div class="flex flex-wrap gap-4">
          <lib-button size="sm" (click)="openSizeModal('xs')">XS Modal</lib-button>
          <lib-button size="sm" (click)="openSizeModal('sm')">Small</lib-button>
          <lib-button (click)="openSizeModal('md')">Medium</lib-button>
          <lib-button (click)="openSizeModal('lg')">Large</lib-button>
          <lib-button (click)="openSizeModal('xl')">Extra Large</lib-button>
          <lib-button size="lg" (click)="openSizeModal('full')">Full Screen</lib-button>
        </div>
      </div>

      <!-- Position Variants -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-foreground">Position Variants</h3>
        
        <div class="flex flex-wrap gap-4">
          <lib-button variant="outline" (click)="openPositionModal('center')">Center</lib-button>
          <lib-button variant="outline" (click)="openPositionModal('top')">Top</lib-button>
          <lib-button variant="outline" (click)="openPositionModal('bottom')">Bottom</lib-button>
          <lib-button variant="outline" (click)="openPositionModal('left')">Left</lib-button>
          <lib-button variant="outline" (click)="openPositionModal('right')">Right</lib-button>
        </div>
      </div>

      <!-- Configuration Options -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-foreground">Configuration Options</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium text-foreground">Settings</label>
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <lib-switch 
                  [checked]="modalConfig().closeOnOverlayClick" 
                  (checkedChange)="updateConfig('closeOnOverlayClick', $event)"
                />
                <label class="text-sm text-foreground">Close on overlay click</label>
              </div>
              <div class="flex items-center space-x-2">
                <lib-switch 
                  [checked]="modalConfig().closeOnEscape" 
                  (checkedChange)="updateConfig('closeOnEscape', $event)"
                />
                <label class="text-sm text-foreground">Close on escape key</label>
              </div>
              <div class="flex items-center space-x-2">
                <lib-switch 
                  [checked]="modalConfig().showCloseButton" 
                  (checkedChange)="updateConfig('showCloseButton', $event)"
                />
                <label class="text-sm text-foreground">Show close button</label>
              </div>
            </div>
          </div>
          
          <div class="space-y-2">
            <lib-button (click)="configModal.set(true)" class="w-full">
              Test Configuration
            </lib-button>
          </div>
        </div>
      </div>

      <!-- Nested Modal Example -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-foreground">Advanced Features</h3>
        
        <div class="flex flex-wrap gap-4">
          <lib-button variant="secondary" (click)="nestedModal1.set(true)">
            Nested Modals
          </lib-button>
          <lib-button variant="ghost" (click)="scrollModal.set(true)">
            Scrollable Content
          </lib-button>
        </div>
      </div>
    </div>

    <!-- Basic Modal -->
    <lib-modal 
      [open]="basicModal()" 
      (openChange)="basicModal.set($event)"
      title="Basic Modal"
      description="This is a simple modal example."
    >
      <p class="text-sm text-muted-foreground">
        This is the modal content. You can put any content here.
      </p>
      
      <div modal-footer class="flex justify-end space-x-2">
        <lib-button variant="outline" (click)="basicModal.set(false)">
          Cancel
        </lib-button>
        <lib-button (click)="basicModal.set(false)">
          OK
        </lib-button>
      </div>
    </lib-modal>

    <!-- Header Modal -->
    <lib-modal 
      [open]="headerModal()" 
      (openChange)="headerModal.set($event)"
      title="Modal with Header"
      description="This modal demonstrates header styling."
    >
      <div class="space-y-4">
        <p class="text-sm text-muted-foreground">
          This modal has a well-defined header with title and description.
        </p>
        <div class="rounded-lg bg-muted p-4">
          <h4 class="font-medium text-foreground">Feature Highlight</h4>
          <p class="text-sm text-muted-foreground mt-1">
            The header provides context and improves accessibility.
          </p>
        </div>
      </div>
      
      <div modal-footer class="flex justify-end space-x-2">
        <lib-button variant="outline" (click)="headerModal.set(false)">
          Close
        </lib-button>
      </div>
    </lib-modal>

    <!-- Form Modal -->
    <lib-modal 
      [open]="formModal()" 
      (openChange)="formModal.set($event)"
      title="Form Example"
      description="Enter your details below."
      size="lg"
    >
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <lib-input 
            placeholder="First name"
            label="First Name"
            [value]="formData().firstName"
            (valueChange)="updateFormData('firstName', $event)"
          />
          <lib-input 
            placeholder="Last name"
            label="Last Name"
            [value]="formData().lastName"
            (valueChange)="updateFormData('lastName', $event)"
          />
        </div>
        <lib-input 
          type="email"
          placeholder="your@email.com"
          label="Email"
          [value]="formData().email"
          (valueChange)="updateFormData('email', $event)"
        />
        <div class="flex items-center space-x-2">
          <lib-switch 
            [checked]="formData().newsletter"
            (checkedChange)="updateFormData('newsletter', $event)"
          />
          <label class="text-sm text-foreground">Subscribe to newsletter</label>
        </div>
      </div>
      
      <div modal-footer class="flex justify-end space-x-2">
        <lib-button variant="outline" (click)="formModal.set(false)">
          Cancel
        </lib-button>
        <lib-button (click)="handleFormSubmit()">
          Save Changes
        </lib-button>
      </div>
    </lib-modal>

    <!-- Confirmation Modal -->
    <lib-modal 
      [open]="confirmModal()" 
      (openChange)="confirmModal.set($event)"
      title="Are you sure?"
      description="This action cannot be undone."
      size="sm"
    >
      <p class="text-sm text-muted-foreground">
        This will permanently delete your account and remove your data from our servers.
      </p>
      
      <div modal-footer class="flex justify-end space-x-2">
        <lib-button variant="outline" (click)="confirmModal.set(false)">
          Cancel
        </lib-button>
        <lib-button variant="destructive" (click)="handleConfirm()">
          Delete Account
        </lib-button>
      </div>
    </lib-modal>

    <!-- Size Modal -->
    <lib-modal 
      [open]="sizeModal.open()" 
      (openChange)="sizeModal.open.set($event)"
      [size]="sizeModal.size()"
      [title]="'Modal Size: ' + sizeModal.size().toUpperCase()"
      [description]="'This is a ' + sizeModal.size() + ' sized modal.'"
    >
      <div class="space-y-4">
        <p class="text-sm text-muted-foreground">
          This modal demonstrates the <strong>{{ sizeModal.size() }}</strong> size variant.
        </p>
        <div class="rounded-lg bg-muted p-4">
          <p class="text-xs text-muted-foreground">
            Modal dimensions adjust based on the size prop while maintaining responsive behavior.
          </p>
        </div>
      </div>
      
      <div modal-footer class="flex justify-end space-x-2">
        <lib-button (click)="sizeModal.open.set(false)">
          Close
        </lib-button>
      </div>
    </lib-modal>

    <!-- Position Modal -->
    <lib-modal 
      [open]="positionModal.open()" 
      (openChange)="positionModal.open.set($event)"
      [position]="positionModal.position()"
      [title]="'Position: ' + positionModal.position().charAt(0).toUpperCase() + positionModal.position().slice(1)"
      [description]="'This modal is positioned at the ' + positionModal.position() + '.'"
    >
      <p class="text-sm text-muted-foreground">
        The modal can be positioned at different locations on the screen.
      </p>
      
      <div modal-footer class="flex justify-end space-x-2">
        <lib-button (click)="positionModal.open.set(false)">
          Close
        </lib-button>
      </div>
    </lib-modal>

    <!-- Configuration Test Modal -->
    <lib-modal 
      [open]="configModal()" 
      (openChange)="configModal.set($event)"
      [closeOnOverlayClick]="modalConfig().closeOnOverlayClick"
      [closeOnEscape]="modalConfig().closeOnEscape"
      [showCloseButton]="modalConfig().showCloseButton"
      title="Configuration Test"
      description="Test the modal with your current settings."
    >
      <div class="space-y-4">
        <p class="text-sm text-muted-foreground">
          This modal uses your current configuration settings:
        </p>
        <ul class="text-sm space-y-1 text-muted-foreground">
          <li>• Close on overlay click: {{ modalConfig().closeOnOverlayClick ? 'Yes' : 'No' }}</li>
          <li>• Close on escape: {{ modalConfig().closeOnEscape ? 'Yes' : 'No' }}</li>
          <li>• Show close button: {{ modalConfig().showCloseButton ? 'Yes' : 'No' }}</li>
        </ul>
      </div>
      
      <div modal-footer class="flex justify-end space-x-2">
        <lib-button (click)="configModal.set(false)">
          Close
        </lib-button>
      </div>
    </lib-modal>

    <!-- Nested Modal 1 -->
    <lib-modal 
      [open]="nestedModal1()" 
      (openChange)="nestedModal1.set($event)"
      title="First Modal"
      description="This is the first modal in a nested sequence."
    >
      <div class="space-y-4">
        <p class="text-sm text-muted-foreground">
          Click the button below to open a second modal on top of this one.
        </p>
        <lib-button (click)="nestedModal2.set(true)">
          Open Second Modal
        </lib-button>
      </div>
      
      <div modal-footer class="flex justify-end space-x-2">
        <lib-button variant="outline" (click)="nestedModal1.set(false)">
          Close
        </lib-button>
      </div>
    </lib-modal>

    <!-- Nested Modal 2 -->
    <lib-modal 
      [open]="nestedModal2()" 
      (openChange)="nestedModal2.set($event)"
      title="Second Modal"
      description="This modal is nested on top of the first one."
      size="sm"
    >
      <p class="text-sm text-muted-foreground">
        This demonstrates modal stacking. Focus management works correctly between nested modals.
      </p>
      
      <div modal-footer class="flex justify-end space-x-2">
        <lib-button (click)="nestedModal2.set(false)">
          Close This Modal
        </lib-button>
      </div>
    </lib-modal>

    <!-- Scrollable Content Modal -->
    <lib-modal 
      [open]="scrollModal()" 
      (openChange)="scrollModal.set($event)"
      title="Scrollable Content"
      description="This modal has a lot of content to demonstrate scrolling."
      size="lg"
    >
      <div class="space-y-6 max-h-96 overflow-y-auto">
        <div class="space-y-4" *ngFor="let section of scrollContent; let i = index">
          <h4 class="font-medium text-foreground">Section {{ i + 1 }}</h4>
          <p class="text-sm text-muted-foreground">{{ section }}</p>
          <div class="h-px bg-border"></div>
        </div>
      </div>
      
      <div modal-footer class="flex justify-end space-x-2">
        <lib-button (click)="scrollModal.set(false)">
          Close
        </lib-button>
      </div>
    </lib-modal>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ModalTestComponent {
  // Basic modal states
  readonly basicModal = signal(false);
  readonly headerModal = signal(false);
  readonly formModal = signal(false);
  readonly confirmModal = signal(false);
  readonly configModal = signal(false);
  readonly nestedModal1 = signal(false);
  readonly nestedModal2 = signal(false);
  readonly scrollModal = signal(false);

  // Size modal state
  readonly sizeModal = {
    open: signal(false),
    size: signal<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>('md')
  };

  // Position modal state
  readonly positionModal = {
    open: signal(false),
    position: signal<'center' | 'top' | 'bottom' | 'left' | 'right'>('center')
  };

  // Modal configuration
  readonly modalConfig = signal({
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true
  });

  // Form data
  readonly formData = signal({
    firstName: '',
    lastName: '',
    email: '',
    newsletter: false
  });

  // Scrollable content
  readonly scrollContent = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.",
    "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth."
  ];

  /**
   * Open size modal with specific size
   */
  openSizeModal(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'): void {
    this.sizeModal.size.set(size);
    this.sizeModal.open.set(true);
  }

  /**
   * Open position modal with specific position
   */
  openPositionModal(position: 'center' | 'top' | 'bottom' | 'left' | 'right'): void {
    this.positionModal.position.set(position);
    this.positionModal.open.set(true);
  }

  /**
   * Update modal configuration
   */
  updateConfig(key: string, value: boolean): void {
    this.modalConfig.update(config => ({
      ...config,
      [key]: value
    }));
  }

  /**
   * Update form data
   */
  updateFormData(key: string, value: any): void {
    this.formData.update(data => ({
      ...data,
      [key]: value
    }));
  }

  /**
   * Handle form submission
   */
  handleFormSubmit(): void {
    console.log('Form submitted:', this.formData());
    this.formModal.set(false);
    // Reset form
    this.formData.set({
      firstName: '',
      lastName: '',
      email: '',
      newsletter: false
    });
  }

  /**
   * Handle confirmation
   */
  handleConfirm(): void {
    console.log('Account deletion confirmed');
    this.confirmModal.set(false);
  }
}